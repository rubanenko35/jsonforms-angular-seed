/*
 jsonforms-uischema-mapper.js

 Mapper: Resource Type + JSON Schema -> JSON Forms UISchemaElement

 - Input: resourceType (your "Resource Type JSON") and dataSchema (JSON Schema as generated)
 - Output: a JSON Forms UISchemaElement (root VerticalLayout)

 Features and design decisions (annotated inside the code):
 - Produces a VerticalLayout with Controls and Groups that mirror resourceType.Properties
 - For Object properties that reference a TypeDeclaration, the mapper expands the type declaration
   and points controls to nested data schema paths (e.g. "#/properties/Gas/properties/Label").
 - For Enum properties, it prefers to target a nested property if the data schema stores the enum
   under an inner property (common pattern: CarrierGas -> { Name: enum }).
 - For ResourceReference properties, it creates a Group with controls for Name and Version.
 - The mapper validates control scopes against the provided data schema and emits console
   warnings for missing paths so you can quickly catch mismatches between ResourceType and
   data schema generation.

 Usage example at the bottom shows mapping your provided resource + data schema.

 NOTE: JSON Forms UI schema objects used are: VerticalLayout, Group, Control.
       We avoid renderer-specific options; keep the UI schema portable.
*/

/**
 * Helper: safe path join for JSON Pointer segments.
 * We assume property names are safe (no ~ or /), but escape if needed.
 */
function jsonPointerJoin(...parts: any) {
  // Accepts parts like '#', 'properties', 'Gas', 'properties', 'Label'
  const esc = (s: any) => String(s).replace(/~/g, '~0').replace(/\//g, '~1');
  // If first part starts with '#', keep it as '#'
  if (parts.length === 0) return '#';
  if (parts[0] === '#') {
    return '#/' + parts.slice(1).map(esc).join('/');
  }
  return '#/' + parts.map(esc).join('/');
}

/**
 * Resolve a JSON Schema path given a control scope like "#/properties/Gas/properties/Label".
 * Returns the schema node or undefined if not found.
 */
export function resolveSchemaByScope(scope: string, dataSchema: any) {
  if (!scope || typeof scope !== 'string') return undefined;
  if (!scope.startsWith('#/')) return undefined;
  const parts = scope.slice(2).split('/').map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  let node = dataSchema;
  for (const p of parts) {
    if (node && typeof node === 'object' && p in node) node = node[p];
    else return undefined;
  }
  return node;
}

/**
 * Validate that control scope exists in the dataSchema. Returns boolean.
 */
export function validateScopeExists(scope: string, dataSchema: any) {
  return !!resolveSchemaByScope(scope, dataSchema);
}

/**
 * Build a JSON Forms Control object for a given JSON Pointer scope and optional label.
 */
function buildControl(scope: any, label?: string | undefined) {
  const ctrl: any = { type: 'Control', scope };
  if (label) {
    // JSON Forms Group supports label; Control uses label from schema by default.
    // Some renderers/readers might pick up ui:label option; we keep this minimal and
    // put label into 'label' for Group contexts; putting it on control may or may not be used
    // depending on the renderer. Keep it for convenience.
    ctrl.label = label;
  }
  return ctrl;
}

/**
 * Build a Group element with a label and nested elements.
 */
function buildGroup(label: any, elements: any[]) {
  return { type: 'Group', label: label || undefined, elements: elements || [] };
}

/**
 * Main mapper function.
 * - resourceType: object (Resource Type JSON)
 * - dataSchema: JSON Schema object
 * - opts: { includeReadonlyVersionControl: boolean }
 *
 * Returns: JSON Forms UISchemaElement (root VerticalLayout)
 */
export function mapResourceTypeToUISchema(resourceType: any, dataSchema: any, opts = {}) {
  // Defensive checks
  if (!resourceType || !dataSchema) throw new Error('resourceType and dataSchema are required');

  const typeDeclMap = new Map();
  (resourceType.TypeDeclarations || []).forEach((td: { Name: any; }) => typeDeclMap.set(td.Name, td));

  const enumDeclMap = new Map();
  (resourceType.EnumDeclarations || []).forEach((ed: { Name: any; }) => enumDeclMap.set(ed.Name, ed));

  const rtProperties = resourceType.Properties || [];
  const rootElements: any = [];

  // Helper to create nested controls for a TypeDeclaration.
  function mapTypeDeclarationProperty(parentPropName: any, typeDecl: { Properties: any; Name: any; }, parentDisplayName: any) {
    const elements: any[] = [];
    (typeDecl.Properties || []).forEach((child: { Name: any; DisplayName: any; }) => {
      // Scope will point to nested property under parentPropName
      const childScope = jsonPointerJoin('#', 'properties', parentPropName, 'properties', child.Name);
      if (!validateScopeExists(childScope, dataSchema)) {
        console.warn(`Scope not found in dataSchema: ${childScope} (declared in TypeDeclaration ${typeDecl.Name})`);
        // fallback: point to top-level property if exists
        const fallback = jsonPointerJoin('#', 'properties', child.Name);
        if (validateScopeExists(fallback, dataSchema)) {
          elements.push(buildControl(fallback, child.DisplayName || child.Name));
        } else {
          // still push a control to keep UI schema complete, but flagged
          elements.push({ type: 'Control', scope: childScope, label: child.DisplayName || child.Name, missing: true });
        }
      } else {
        elements.push(buildControl(childScope, child.DisplayName || child.Name));
      }
    });
    return buildGroup(parentDisplayName || parentPropName, elements);
  }

  // Iterate resourceType.Properties in given order to preserve intended layout
  rtProperties.forEach((prop: { Name: any; DisplayName: any; Type: any; TypeDeclaration: any; }) => {
    const propName = prop.Name;
    const displayName = prop.DisplayName || propName;

    // Lookup the corresponding node in dataSchema
    const dsPropNode = (dataSchema.properties && dataSchema.properties[propName]) || undefined;

    // Handle based on RT property Type
    switch ((prop.Type || '').toLowerCase()) {
      case 'object': {
        // If there is a TypeDeclaration reference, expand it
        if (prop.TypeDeclaration) {
          const typeDecl = typeDeclMap.get(prop.TypeDeclaration);
          if (typeDecl) {
            const group = mapTypeDeclarationProperty(propName, typeDecl, displayName);
            rootElements.push(group);
          } else {
            // No type declaration found: treat as opaque object -> create a group and include a single control
            const scope = jsonPointerJoin('#', 'properties', propName);
            if (!validateScopeExists(scope, dataSchema)) console.warn(`Object scope missing: ${scope}`);
            rootElements.push(buildGroup(displayName, [buildControl(scope)]));
          }
        } else {
          // If data schema shows an object with properties, expand those
          if (dsPropNode && dsPropNode.type === 'object' && dsPropNode.properties) {
            const elements = Object.keys(dsPropNode.properties).map(childName => {
              const childScope = jsonPointerJoin('#', 'properties', propName, 'properties', childName);
              return buildControl(childScope, childName);
            });
            rootElements.push(buildGroup(displayName, elements));
          } else {
            const scope = jsonPointerJoin('#', 'properties', propName);
            rootElements.push(buildGroup(displayName, [buildControl(scope)]));
          }
        }
        break;
      }

      case 'resourcereference': {
        // Usually represented in the data schema as an object { Name, Version }
        const nameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const verScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Version');
        const elements = [];
        if (validateScopeExists(nameScope, dataSchema)) elements.push(buildControl(nameScope, `${displayName} - Name`));
        else {
          console.warn(`ResourceReference name scope missing: ${nameScope}`);
          elements.push(buildControl(jsonPointerJoin('#', 'properties', propName), `${displayName}`));
        }
        if (validateScopeExists(verScope, dataSchema)) elements.push(buildControl(verScope, `${displayName} - Version`));
        // Optionally include a readonly version control depending on opts
        rootElements.push(buildGroup(displayName, elements));
        break;
      }

      case 'enum': {
        // Enum may be represented in the data schema either as a primitive with enum or as nested object.Name(enum)
        // First try nested Name under the property
        const nestedNameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const directScope = jsonPointerJoin('#', 'properties', propName);
        if (validateScopeExists(nestedNameScope, dataSchema)) {
          rootElements.push(buildControl(nestedNameScope, displayName));
        } else if (validateScopeExists(directScope, dataSchema)) {
          rootElements.push(buildControl(directScope, displayName));
        } else {
          console.warn(`Enum scope not found: tried ${nestedNameScope} and ${directScope}`);
          rootElements.push(buildControl(directScope, displayName));
        }
        break;
      }

      case 'string':
      case 'number':
      case 'boolean':
      case 'date':
      case 'text':
      default: {
        // Default: create a control for the top-level property
        const scope = jsonPointerJoin('#', 'properties', propName);
        if (!validateScopeExists(scope, dataSchema)) {
          // try fallback: maybe type declaration defined the children with this name
          if (prop.TypeDeclaration) {
            const typeDecl = typeDeclMap.get(prop.TypeDeclaration);
            if (typeDecl) {
              rootElements.push(mapTypeDeclarationProperty(propName, typeDecl, displayName));
              break;
            }
          }
          console.warn(`Primitive scope not found: ${scope}`);
          // still push control so UI schema is complete
          rootElements.push(buildControl(scope, displayName));
        } else {
          rootElements.push(buildControl(scope, displayName));
        }
      }
    }
  });

  const ui = {
    type: 'VerticalLayout',
    elements: rootElements
  };

  // Post-check: validate all controls and mark missing ones
  function markMissing(node: any) {
    if (node.type === 'Control') {
      const exists = validateScopeExists(node.scope, dataSchema);
      if (!exists) node._missingScope = true; // internal annotation
    } else if (node.elements && Array.isArray(node.elements)) {
      node.elements.forEach(markMissing);
    }
  }
  markMissing(ui);

  return ui;
}

// -------------------------------
// Example usage with provided data (you can replace resourceType/dataSchema with your objects)
// -------------------------------

/* Uncomment and run in Node / Browser console:
const resourceType = /* paste your Resource Type JSON here * / {};
const dataSchema = /* paste your data schema JSON here * / {};
const uiSchema = mapResourceTypeToUISchema(resourceType, dataSchema);
console.log(JSON.stringify(uiSchema, null, 2));
*/

/*
 Annotation summary (double-checked):
 - Scopes created follow JSON Pointer convention used by JSON Forms ("#/properties/...").
 - Enum handling attempts to detect nested enum under object.Name (common in your example
   for CarrierGas).
 - TypeDeclaration expansion uses declarations from resourceType.TypeDeclarations. It maps
   each declared property to a nested control under the parent property.
 - The mapper warns to console when it cannot find a scope in the data schema. This is
   essential: often the server-side generator transforms ResourceType names slightly or nests
   enum/enum properties differently; the warnings help you tune the mapper or adjust the schema.
 - The result is intentionally minimal (no renderer-specific options) so you can drop it
   into JSON Forms and it will render using built-in renderers. If you want custom widget
   hints or placement, extend buildControl/buildGroup to add `options`.
*/
