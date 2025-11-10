import { Component, computed, inject, model, signal, WritableSignal } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonPipe } from '@angular/common';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ACCOUNT_SCHEMA } from '../builder-test/schema';

@Component({
  selector: 'app-custom-schema',
  imports: [
    JsonFormsModule,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './custom-schema.component.html',
  styleUrl: './custom-schema.component.scss'
})
export class CustomSchemaComponent {
  protected renderers = [
    ...angularMaterialRenderers,
  ];

  ajv = createAjv({
    schemaId: 'id',
    allErrors: true,
    useDefaults: true
  });


  protected readonly data = {};
  protected activatedRoute = inject(ActivatedRoute);

  protected readonly title: string;
  protected readonly uiSchema = null;
  protected readonly schemaStr = model(JSON.stringify(ACCOUNT_SCHEMA, null, 2));

  protected formData: any = {};

  protected schema = computed(() => {
    try {
      return JSON.parse(this.schemaStr()) as JsonSchema;
    } catch {
      return {};
    }
  })

  constructor() {
    this.title = this.activatedRoute.snapshot.data['title'];
  }

  protected dataChange(data: any) {
    console.log('>>>>> Data Change', data);
    this.formData = data;
  }

  protected emittedErrors(val: any) {
    console.log('>>>>> Errors', val);
  }
}
