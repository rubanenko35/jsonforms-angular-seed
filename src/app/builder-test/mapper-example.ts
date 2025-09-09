import { mapToUISchema } from './ui-schema-mapper';
import { RESOURCE_TYPE } from './type';
import { RESOURCE_SCHEMA } from './schema';

/**
 * Example usage of the UI schema mapper
 */
export function generateUISchema() {
  const uiSchema = mapToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA);
  
  console.log('Generated UI Schema:', JSON.stringify(uiSchema, null, 2));
  
  return uiSchema;
}

// Export the generated UI schema for use in components
export const GENERATED_UI_SCHEMA = mapToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA);