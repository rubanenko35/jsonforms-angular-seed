import { mapResourceTypeToUISchema } from './test';
import { RESOURCE_TYPE, REPORT_TYPE } from './type';
import { RESOURCE_SCHEMA, REPORT_SCHEMA } from './schema';

/**
 * Test the enhanced mapper with both resource types
 */
export function testEnhancedMapper() {
  console.log('=== Testing Enhanced UI Schema Mapper ===\n');
  
  // Test with Resource Type (Gas Bottles)
  console.log('1. Testing RESOURCE_TYPE (Gas Bottles):');
  const resourceUISchema = mapResourceTypeToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA);
  console.log(JSON.stringify(resourceUISchema, null, 2));
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test with Report Type
  console.log('2. Testing REPORT_TYPE (Reports):');
  const reportUISchema = mapResourceTypeToUISchema(REPORT_TYPE, REPORT_SCHEMA);
  console.log(JSON.stringify(reportUISchema, null, 2));
  
  return { resourceUISchema, reportUISchema };
}

/**
 * Analyze the mapping results
 */
export function analyzeMapping() {
  const { resourceUISchema, reportUISchema } = testEnhancedMapper();
  
  console.log('\n=== Mapping Analysis ===');
  
  // Count different element types
  function countElements(schema: any): { controls: number; groups: number; total: number } {
    let controls = 0;
    let groups = 0;
    
    function traverse(element: any) {
      if (element.type === 'Control') controls++;
      if (element.type === 'Group') groups++;
      if (element.elements) {
        element.elements.forEach(traverse);
      }
    }
    
    traverse(schema);
    return { controls, groups, total: controls + groups };
  }
  
  const resourceStats = countElements(resourceUISchema);
  const reportStats = countElements(reportUISchema);
  
  console.log(`\nResource Schema Stats:`, resourceStats);
  console.log(`Report Schema Stats:`, reportStats);
  
  return { resourceStats, reportStats };
}

// Export for use in components
export const RESOURCE_UI_SCHEMA = mapResourceTypeToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA);
export const REPORT_UI_SCHEMA = mapResourceTypeToUISchema(REPORT_TYPE, REPORT_SCHEMA);