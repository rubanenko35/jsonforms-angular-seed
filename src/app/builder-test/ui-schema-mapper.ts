import { UISchemaElement, ControlElement } from '@jsonforms/core';

/**
 * Resource type property definition
 */
interface ResourceProperty {
  Type: string;
  Name: string;
  DisplayName: string;
  Description: string;
  Unit?: string;
  ResourceType?: string;
  TypeDeclaration?: string;
  EnumDeclaration?: string;
  IsDeleted?: boolean;
}

/**
 * Resource type definition
 */
interface ResourceType {
  Name: string;
  DisplayName: string;
  Description: string;
  Properties: ResourceProperty[];
  TypeDeclarations?: any[];
  EnumDeclarations?: any[];
}

/**
 * JSON Schema definition
 */
interface JsonSchema {
  type: string;
  properties: Record<string, any>;
  [key: string]: any;
}

/**
 * Maps resource type and JSON schema to UI schema element
 */
export function mapToUISchema(resourceType: ResourceType, jsonSchema: JsonSchema): UISchemaElement {
  const elements: UISchemaElement[] = [];

  // Process each property from resource type
  resourceType.Properties?.forEach(property => {
    if (property.IsDeleted) return;

    const schemaProperty = jsonSchema.properties[property.Name];
    if (!schemaProperty) return;

    const element = createControlElement(property, schemaProperty);
    if (element) {
      elements.push(element);
    }
  });

  // Process remaining schema properties not in resource type
  Object.keys(jsonSchema.properties).forEach(propName => {
    const existsInResourceType = resourceType.Properties?.some(p => p.Name === propName);
    if (!existsInResourceType) {
      const schemaProperty = jsonSchema.properties[propName];
      const element = createControlElementFromSchema(propName, schemaProperty);
      if (element) {
        elements.push(element);
      }
    }
  });

  return {
    type: 'VerticalLayout',
    elements
  } as any;
}

/**
 * Creates control element from resource property and schema property
 */
function createControlElement(property: ResourceProperty, schemaProperty: any): ControlElement | null {
  const scope = `#/properties/${property.Name}`;

  const element: ControlElement = {
    type: 'Control',
    scope,
    label: property.DisplayName || property.Name
  };

  // Add options based on property type and schema
  const options: any = {};

  if (property.Description) {
    options.description = property.Description;
  }

  if (property.Unit) {
    options.unit = property.Unit;
  }

  // Handle specific types
  if (property.Type === 'Date') {
    options.format = 'date';
  }

  if (property.Type === 'Text') {
    options.multi = true;
  }

  if (schemaProperty.readonly) {
    options.readonly = true;
  }

  if (schemaProperty.enum) {
    options.enum = schemaProperty.enum;
  }

  if (Object.keys(options).length > 0) {
    element.options = options;
  }

  return element;
}

/**
 * Creates control element from schema property only
 */
function createControlElementFromSchema(propName: string, schemaProperty: any): ControlElement | null {
  const scope = `#/properties/${propName}`;

  const element: ControlElement = {
    type: 'Control',
    scope,
    label: schemaProperty.description || propName
  };

  const options: any = {};

  if (schemaProperty.description) {
    options.description = schemaProperty.description;
  }

  if (schemaProperty.readonly) {
    options.readonly = true;
  }

  if (schemaProperty.enum) {
    options.enum = schemaProperty.enum;
  }

  if (schemaProperty.type === 'array') {
    options.showSortButtons = true;
  }

  if (Object.keys(options).length > 0) {
    element.options = options;
  }

  return element;
}
