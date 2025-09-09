import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { AppComponent } from './app.component';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { BuilderTestComponent } from './builder-test/builder-test.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatButton,
    HttpClientModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BuilderTestComponent
      },
      {
        path: 'demo',
        component: DemoComponent
      }
    ])
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
