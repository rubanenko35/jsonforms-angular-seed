import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTestComponent } from './builder-test.component';

describe('BuilderTestComponent', () => {
  let component: BuilderTestComponent;
  let fixture: ComponentFixture<BuilderTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuilderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
