import { Component } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { RESOURCE_SCHEMA } from './schema';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'app-builder-test',
  imports: [
    JsonFormsModule
  ],
  templateUrl: './builder-test.component.html',
  styleUrl: './builder-test.component.css'
})
export class BuilderTestComponent {
  protected renderers = [
    ...angularMaterialRenderers,
  ];

  ajv = createAjv({
    schemaId: 'id',
    allErrors: true
  });


  protected readonly data = {};
  protected readonly uiSchema: UISchemaElement = null as any;
  protected readonly schema: JsonSchema = RESOURCE_SCHEMA;

  protected dataChange(data: any) {
    console.log('>>>>> Data Change', data);
  }

  protected emittedErrors(val: any) {
    console.log('>>>>> Errors', val);
  }

  toUiSchema() {

  }
}
