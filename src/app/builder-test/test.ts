/**
 * Enhanced JSON Forms UI Schema Mapper
 *
 * Maps Resource Type + JSON Schema -> JSON Forms UISchemaElement
 *
 * Features:
 * - Handles all property types: primitives, objects, arrays, enums, resource references
 * - Supports nested TypeDeclarations with proper scope resolution
 * - Validates scopes against JSON schema and marks missing ones
 * - Adds control options based on property metadata (units, descriptions, readonly)
 * - Handles array properties with proper item controls
 * - Supports enum properties with both direct and nested Name patterns
 */

import { UISchemaElement, ControlElement } from '@jsonforms/core';

// Type definitions
export interface ResourceType {
  Source?: string;
  AllowedOperations?: string;
  Name: string;
  DisplayName?: string;
  Description?: string;
  TypeDeclarations?: TypeDeclaration[];
  EnumDeclarations?: EnumDeclaration[];
  Properties?: ResourceProperty[];
}

export interface TypeDeclaration {
  Name: string;
  Properties: ResourceProperty[];
}

export interface EnumDeclaration {
  Name: string;
  DisplayName?: string;
  Enumerators: { Name: string; Value: number; DisplayName?: string }[];
}

export interface ResourceProperty {
  Type: string;
  Name: string;
  DisplayName?: string;
  Description?: string;
  ResourceType?: string;
  TypeDeclaration?: string;
  EnumDeclaration?: string;
  Unit?: string;
  IsDeleted?: boolean;
  IsRequired?: boolean;
  ElementTypes?: { Type: string }[];
  DefaultValue?: any;
}

export interface JsonSchema {
  $schema?: string;
  id?: string;
  title?: string;
  type?: string;
  description?: string;
  properties?: Record<string, any>;
  items?: any;
  enum?: any[];
  readonly?: boolean;
  [key: string]: any;
}

// Helper functions
function jsonPointerJoin(...parts: string[]): string {
  const esc = (s: string) => s.replace(/~/g, '~0').replace(/\//g, '~1');
  if (parts.length === 0) return '#';
  if (parts[0] === '#') {
    return '#/' + parts.slice(1).map(esc).join('/');
  }
  return '#/' + parts.map(esc).join('/');
}

function resolveSchemaByScope(scope: string, dataSchema: JsonSchema): any | undefined {
  if (!scope.startsWith('#/')) return undefined;
  const parts = scope.slice(2).split('/').map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  let node: any = dataSchema;
  for (const p of parts) {
    if (node && typeof node === 'object' && p in node) node = node[p];
    else return undefined;
  }
  return node;
}

function validateScopeExists(scope: string, dataSchema: JsonSchema): boolean {
  return !!resolveSchemaByScope(scope, dataSchema);
}

function buildControl(scope: string, label?: string, options?: any): ControlElement {
  const ctrl: ControlElement = { type: 'Control', scope };
  if (label) ctrl.label = label;
  if (options && Object.keys(options).length > 0) ctrl.options = options;
  return ctrl;
}

function buildGroup(label: string, elements: UISchemaElement[]): any { // GroupElement
  return { type: 'Group', label, elements };
}

/**
 * Creates control options based on property and schema metadata
 */
function createControlOptions(prop: ResourceProperty, schemaProp?: any): any {
  const options: any = {};

  // Add description
  if (prop.Description) options.description = prop.Description;

  // Add unit for numeric fields
  if (prop.Unit) options.unit = prop.Unit;

  // Handle specific property types
  switch (prop.Type.toLowerCase()) {
    case 'date':
      options.format = 'date';
      break;
    case 'text':
      options.multi = true;
      break;
    case 'integer':
      options.format = 'integer';
      break;
  }

  // Add schema-based options
  if (schemaProp) {
    if (schemaProp.readonly) options.readonly = true;
    if (schemaProp.enum) options.enum = schemaProp.enum;
    if (schemaProp.format) options.format = schemaProp.format;
  }

  return options;
}

/**
 * Maps array properties to appropriate UI elements
 */
function mapArrayProperty(prop: ResourceProperty, propName: string, dataSchema: JsonSchema): UISchemaElement {
  const scope = jsonPointerJoin('#', 'properties', propName);
  const displayName = prop.DisplayName || propName;
  const options = createControlOptions(prop, resolveSchemaByScope(scope, dataSchema));

  // Add array-specific options
  options.showSortButtons = true;
  options.elementLabelProp = 'Name'; // Common pattern for array items

  return buildControl(scope, displayName, options);
}

/**
 * Maps TypeDeclaration properties to nested group structure
 */
function mapTypeDeclarationProperty(
  parentPropName: string,
  typeDecl: TypeDeclaration,
  parentDisplayName: string,
  dataSchema: JsonSchema
): any { // GroupElement
  const elements: UISchemaElement[] = [];

  (typeDecl.Properties || []).forEach(child => {
    if (child.IsDeleted) return;

    const childScope = jsonPointerJoin('#', 'properties', parentPropName, 'properties', child.Name);
    const schemaProp = resolveSchemaByScope(childScope, dataSchema);
    const options = createControlOptions(child, schemaProp);

    if (!validateScopeExists(childScope, dataSchema)) {
      console.warn(`TypeDeclaration scope not found: ${childScope}`);
    }

    // Handle nested resource references within type declarations
    if (child.Type.toLowerCase() === 'resourcereference') {
      const nameScope = jsonPointerJoin('#', 'properties', parentPropName, 'properties', child.Name, 'properties', 'Name');
      const verScope = jsonPointerJoin('#', 'properties', parentPropName, 'properties', child.Name, 'properties', 'Version');
      const refElements: UISchemaElement[] = [];

      if (validateScopeExists(nameScope, dataSchema)) {
        refElements.push(buildControl(nameScope, `${child.DisplayName || child.Name} - Name`));
      }
      if (validateScopeExists(verScope, dataSchema)) {
        refElements.push(buildControl(verScope, `${child.DisplayName || child.Name} - Version`));
      }

      if (refElements.length > 0) {
        elements.push(buildGroup(child.DisplayName || child.Name, refElements));
      }
    } else {
      elements.push(buildControl(childScope, child.DisplayName || child.Name, options));
    }
  });

  return buildGroup(parentDisplayName, elements);
}

/**
 * Main mapper function
 */
export function mapResourceTypeToUISchema(
  resourceType: ResourceType,
  dataSchema: JsonSchema
): any { // LayoutElement
  const typeDeclMap = new Map<string, TypeDeclaration>();
  (resourceType.TypeDeclarations || []).forEach(td => typeDeclMap.set(td.Name, td));

  const rootElements: UISchemaElement[] = [];

  // Process resource type properties
  (resourceType.Properties || []).forEach(prop => {
    if (prop.IsDeleted) return;

    const propName = prop.Name;
    const displayName = prop.DisplayName || propName;
    const scope = jsonPointerJoin('#', 'properties', propName);
    const schemaProp = resolveSchemaByScope(scope, dataSchema);

    switch (prop.Type.toLowerCase()) {
      case 'object': {
        if (prop.TypeDeclaration) {
          const typeDecl = typeDeclMap.get(prop.TypeDeclaration);
          if (typeDecl) {
            rootElements.push(mapTypeDeclarationProperty(propName, typeDecl, displayName, dataSchema));
          } else {
            console.warn(`TypeDeclaration not found: ${prop.TypeDeclaration}`);
            const options = createControlOptions(prop, schemaProp);
            rootElements.push(buildControl(scope, displayName, options));
          }
        } else {
          // Handle direct object properties (like GridIntegration)
          const options = createControlOptions(prop, schemaProp);
          if (schemaProp?.properties) {
            // Create group with nested controls for object properties
            const objElements: UISchemaElement[] = [];
            Object.keys(schemaProp.properties).forEach(nestedProp => {
              const nestedScope = jsonPointerJoin('#', 'properties', propName, 'properties', nestedProp);
              const nestedSchemaProp = schemaProp.properties[nestedProp];
              const nestedOptions = { ...options };
              if (nestedSchemaProp.description) nestedOptions.description = nestedSchemaProp.description;
              objElements.push(buildControl(nestedScope, nestedProp, nestedOptions));
            });
            rootElements.push(buildGroup(displayName, objElements));
          } else {
            rootElements.push(buildControl(scope, displayName, options));
          }
        }
        break;
      }

      case 'resourcereference': {
        const nameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const verScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Version');
        const elements: UISchemaElement[] = [];

        if (validateScopeExists(nameScope, dataSchema)) {
          elements.push(buildControl(nameScope, `${displayName} - Name`));
        }
        if (validateScopeExists(verScope, dataSchema)) {
          elements.push(buildControl(verScope, `${displayName} - Version`));
        }

        if (elements.length > 0) {
          rootElements.push(buildGroup(displayName, elements));
        }
        break;
      }

      case 'enum': {
        // Try nested Name pattern first (common in schemas)
        const nestedNameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const directScope = jsonPointerJoin('#', 'properties', propName);

        if (validateScopeExists(nestedNameScope, dataSchema)) {
          const nestedSchemaProp = resolveSchemaByScope(nestedNameScope, dataSchema);
          const options = createControlOptions(prop, nestedSchemaProp);
          rootElements.push(buildControl(nestedNameScope, displayName, options));
        } else if (validateScopeExists(directScope, dataSchema)) {
          const options = createControlOptions(prop, schemaProp);
          rootElements.push(buildControl(directScope, displayName, options));
        } else {
          console.warn(`Enum scope not found for: ${propName}`);
        }
        break;
      }

      case 'array': {
        rootElements.push(mapArrayProperty(prop, propName, dataSchema));
        break;
      }

      default: {
        // Handle primitive types (String, Boolean, Number, Integer, Date, Text)
        if (!validateScopeExists(scope, dataSchema)) {
          console.warn(`Primitive scope not found: ${scope}`);
        }
        const options = createControlOptions(prop, schemaProp);
        rootElements.push(buildControl(scope, displayName, options));
      }
    }
  });

  // Add any remaining schema properties not covered by resource type
  if (dataSchema.properties) {
    Object.keys(dataSchema.properties).forEach(propName => {
      const existsInResourceType = resourceType.Properties?.some(p => p.Name === propName && !p.IsDeleted);
      if (!existsInResourceType) {
        const scope = jsonPointerJoin('#', 'properties', propName);
        const schemaProp = dataSchema.properties![propName];
        const options: any = {};

        if (schemaProp.description) options.description = schemaProp.description;
        if (schemaProp.readonly) options.readonly = true;
        if (schemaProp.enum) options.enum = schemaProp.enum;
        if (schemaProp.type === 'array') options.showSortButtons = true;

        rootElements.push(buildControl(scope, propName, options));
      }
    });
  }

  return { type: 'VerticalLayout', elements: rootElements };
}
