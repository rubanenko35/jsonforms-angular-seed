import { Component, inject, OnInit } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { REPORT_SCHEMA, RESOURCE_SCHEMA } from './schema';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { GENERATED_UI_SCHEMA } from './mapper-example';
import { REPORT_TYPE, RESOURCE_TYPE } from './type';
import { mapResourceTypeToUISchema } from './test';
import { JsonPipe } from '@angular/common';
import { mapToUISchema } from './ui-schema-mapper';
import { ActivatedRoute } from '@angular/router';

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
    allErrors: true,
    useDefaults: true
  });


  protected readonly data = {};

  // This mapper is more accurate
  // protected testUiSchema =  mapResourceTypeToUISchema(RESOURCE_TYPE, RESOURCE_SCHEMA);
  // protected testUiSchema2 =  mapToUISchema(REPORT_TYPE as any, REPORT_SCHEMA);

  protected activatedRoute = inject(ActivatedRoute);

  protected readonly title: string;
  protected readonly uiSchema: UISchemaElement;
  protected readonly schema: JsonSchema; //  = DEMO_SCHEMA;

  protected formData: any = {};

  constructor() {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.uiSchema = this.activatedRoute.snapshot.data['uiSchema'] as UISchemaElement;
    this.schema = this.activatedRoute.snapshot.data['schema'] as JsonSchema;
  }

  ngOnInit(): void {
    // console.log('mapResourceTypeToUISchema', this.testUiSchema);
    // console.log('mapToUISchema', this.testUiSchema);
  }

  protected dataChange(data: any) {
    console.log('>>>>> Data Change', data);
    this.formData = data;
  }

  protected emittedErrors(val: any) {
    console.log('>>>>> Errors', val);
  }
}
