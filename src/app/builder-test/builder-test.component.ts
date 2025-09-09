import { Component, OnInit } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { RESOURCE_SCHEMA } from './schema';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { GENERATED_UI_SCHEMA } from './mapper-example';
import { RESOURCE_TYPE } from './type';
import { mapResourceTypeToUISchema } from './test';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-builder-test',
  imports: [
    JsonFormsModule,
    JsonPipe
  ],
  templateUrl: './builder-test.component.html',
  styleUrl: './builder-test.component.scss'
})
export class BuilderTestComponent implements OnInit {
  protected renderers = [
    ...angularMaterialRenderers,
  ];

  ajv = createAjv({
    schemaId: 'id',
    allErrors: true
  });


  protected readonly data = {};

  protected testUiSchema =  mapResourceTypeToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA)

  protected readonly uiSchema: UISchemaElement = this.testUiSchema;
// {
//     ...this.testUiSchema,
//     elements: this.testUiSchema.elements.slice(0, 1)
//   }
  protected readonly schema: JsonSchema = RESOURCE_SCHEMA;

  protected formData: any = {};

  ngOnInit(): void {
    console.log('GENERATED_UI_SCHEMA', GENERATED_UI_SCHEMA);
    console.log('testUiSchema',this.testUiSchema);
    console.log('uiSchema',this.uiSchema);
  }

  protected dataChange(data: any) {
    console.log('>>>>> Data Change', data);
    this.formData = data;
  }

  protected emittedErrors(val: any) {
    console.log('>>>>> Errors', val);
  }

  toUiSchema() {

  }
}
