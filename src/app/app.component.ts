import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import {
  and,
  createAjv,
  isControl,
  JsonFormsI18nState,
  optionIs,
  rankWith,
  schemaTypeIs,
  scopeEndsWith,
  Tester, ValidationMode
} from '@jsonforms/core';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';
import dataAsset from './data';
import { parsePhoneNumber } from 'libphonenumber-js';
import { DateAdapter } from '@angular/material/core';
import { ErrorObject } from 'ajv';

const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('department')
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  renderers = [
    ...angularMaterialRenderers,
    { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer },
    {
      renderer: DataDisplayComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          scopeEndsWith('___data')
        )
      )
    },
    {
      renderer: LangComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          optionIs('lang', true)
        )
      )
    },
  ];
  uischema: any = uischemaAsset;
  schema = schemaAsset;
  data: any = dataAsset;


  data2 = {};
  uischema2: any = {
    "type": "HorizontalLayout",
    "elements": [
      {
        "type": "Control",
        "label": "Test Checkbox",
        "scope": "#/properties/show"
      },
      {
        "type": "Control",
        "label": "Test Input",
        "scope": "#/properties/firstName"
      }
    ]
  };
  schema2 = {
    "properties": {
      "show": {
        "type": "boolean"
      },
      "firstName": {
        "type": "string"
      }
    },
  };

  payload = this.data;

  additionalErrors: ErrorObject[] = [];
  additionalErrors2: ErrorObject[] = [];

  i18n: JsonFormsI18nState = {
    locale: 'de-DE',
    // translate: (id: string, defaultMessage: any, values?: any) => {
    //   return id;
    // },
    // translateError: (error: any) => {
    //   console.log('>>>>> Translate Error', error);
    //   return error;
    // }
  };
  dateAdapter;
  ajv = createAjv({
    schemaId: 'id',
    allErrors: true
  });

  validationMode: ValidationMode = 'ValidateAndShow';

  constructor(dateAdapter: DateAdapter<Date>) {
    this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    this.dateAdapter = dateAdapter;
    dateAdapter.setLocale(this.i18n.locale);
    this.ajv.addFormat('tel', maybePhoneNumber => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'DE');
        return true;
      } catch (_) {
        return false;
      }
    });
  }

  addAdditionalError() {
    const newError: ErrorObject = {
      // AJV style path to the property in the schema
      instancePath: '/orders/0/title',
      // message to display
      message: 'New title error',
      schemaPath: '#/properties/title',
      keyword: '',
      params: {},
    };

    this.additionalErrors = [newError, ...this.additionalErrors];
  }

  removeErrors() {
    this.additionalErrors = [];
  }

  addAdditionalError2() {
    const newError: ErrorObject = {
      // AJV style path to the property in the schema
      instancePath: '/firstName',
      // message to display
      message: 'New error',
      schemaPath: '#/properties/firstName',
      keyword: '',
      params: {},
    };

    this.additionalErrors2 = [newError, ...this.additionalErrors2];
  }

  removeErrors2() {
    this.additionalErrors2 = [];
  }


  dataChange(data: any) {
    console.log('>>>>> Data Change', data);
    this.payload = data;
  }

  emittedErrors(val: any) {
    console.log('>>>>> Errors', val);
  }

  dataChange2(data2: any) {
    console.log('>>>>>!!!  Data 2 Change', data2);


    this.payload.orders[0].showFields = data2.show;

    this.data = { ...this.payload };
  }
}
