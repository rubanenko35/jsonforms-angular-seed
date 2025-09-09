/*
 jsonforms-uischema-mapper.ts

 Mapper: Resource Type + JSON Schema -> JSON Forms UISchemaElement

 - Input: resourceType (your "Resource Type JSON") and dataSchema (JSON Schema as generated)
 - Output: a JSON Forms UISchemaElement (root VerticalLayout)

 Features:
 - Produces a VerticalLayout with Controls and Groups that mirror resourceType.Properties
 - Expands TypeDeclarations into nested Groups
 - Handles Enum, ResourceReference, primitive properties
 - Validates control scopes against the dataSchema and logs warnings for missing ones

*/

import { UISchemaElement } from '@jsonforms/core';

// Type definitions for input structures
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
}

// JSON Schema is loosely typed here; we only need partial typing
export interface JsonSchema {
  $schema?: string;
  id?: string;
  title?: string;
  type?: string;
  description?: string;
  properties?: Record<string, any>;
  [key: string]: any;
}

// ----------------- Helper functions -----------------

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

function buildControl(scope: string, label?: string): UISchemaElement {
  const ctrl: any = { type: 'Control', scope };
  if (label) ctrl.label = label;
  return ctrl;
}

function buildGroup(label: string, elements: UISchemaElement[]): UISchemaElement {
  return { type: 'Group', label, elements };
}

// ----------------- Main Mapper -----------------

export function mapResourceTypeToUISchema(
  resourceType: ResourceType,
  dataSchema: JsonSchema,
  opts: { includeReadonlyVersionControl?: boolean } = {}
): UISchemaElement {
  const typeDeclMap = new Map<string, TypeDeclaration>();
  (resourceType.TypeDeclarations || []).forEach(td => typeDeclMap.set(td.Name, td));

  const rootElements: UISchemaElement[] = [];

  function mapTypeDeclarationProperty(parentPropName: string, typeDecl: TypeDeclaration, parentDisplayName?: string): UISchemaElement {
    const elements: UISchemaElement[] = [];
    (typeDecl.Properties || []).forEach(child => {
      const childScope = jsonPointerJoin('#', 'properties', parentPropName, 'properties', child.Name);
      if (!validateScopeExists(childScope, dataSchema)) {
        console.warn(`Scope not found: ${childScope}`);
        elements.push({ type: 'Control', scope: childScope, label: child.DisplayName || child.Name, missing: true } as any);
      } else {
        elements.push(buildControl(childScope, child.DisplayName || child.Name));
      }
    });
    return buildGroup(parentDisplayName || parentPropName, elements);
  }

  (resourceType.Properties || []).forEach(prop => {
    const propName = prop.Name;
    const displayName = prop.DisplayName || propName;

    switch (prop.Type.toLowerCase()) {
      case 'object': {
        if (prop.TypeDeclaration) {
          const typeDecl = typeDeclMap.get(prop.TypeDeclaration);
          if (typeDecl) {
            rootElements.push(mapTypeDeclarationProperty(propName, typeDecl, displayName));
          } else {
            const scope = jsonPointerJoin('#', 'properties', propName);
            rootElements.push(buildGroup(displayName, [buildControl(scope)]));
          }
        } else {
          const scope = jsonPointerJoin('#', 'properties', propName);
          rootElements.push(buildGroup(displayName, [buildControl(scope)]));
        }
        break;
      }
      case 'resourcereference': {
        const nameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const verScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Version');
        const elements: UISchemaElement[] = [];
        if (validateScopeExists(nameScope, dataSchema)) elements.push(buildControl(nameScope, `${displayName} - Name`));
        if (validateScopeExists(verScope, dataSchema)) elements.push(buildControl(verScope, `${displayName} - Version`));
        rootElements.push(buildGroup(displayName, elements));
        break;
      }
      case 'enum': {
        const nestedNameScope = jsonPointerJoin('#', 'properties', propName, 'properties', 'Name');
        const directScope = jsonPointerJoin('#', 'properties', propName);
        if (validateScopeExists(nestedNameScope, dataSchema)) {
          rootElements.push(buildControl(nestedNameScope, displayName));
        } else {
          rootElements.push(buildControl(directScope, displayName));
        }
        break;
      }
      default: {
        const scope = jsonPointerJoin('#', 'properties', propName);
        if (!validateScopeExists(scope, dataSchema)) {
          console.warn(`Primitive scope not found: ${scope}`);
        }
        rootElements.push(buildControl(scope, displayName));
      }
    }
  });

  const ui: UISchemaElement = { type: 'VerticalLayout', elements: rootElements };

  function markMissing(node: UISchemaElement): void {
    if ((node as any).type === 'Control') {
      const exists = validateScopeExists((node as any).scope, dataSchema);
      if (!exists) (node as any)._missingScope = true;
    } else if ((node as any).elements && Array.isArray((node as any).elements)) {
      (node as any).elements.forEach(markMissing);
    }
  }
  markMissing(ui);

  return ui;
}
