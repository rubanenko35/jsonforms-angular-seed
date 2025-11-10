import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSchemaComponent } from './custom-schema.component';

describe('CustomSchemaComponent', () => {
  let component: CustomSchemaComponent;
  let fixture: ComponentFixture<CustomSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSchemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
