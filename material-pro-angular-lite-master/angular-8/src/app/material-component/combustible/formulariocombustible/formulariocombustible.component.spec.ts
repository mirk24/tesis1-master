import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariocombustibleComponent } from './formulariocombustible.component';

describe('FormulariocombustibleComponent', () => {
  let component: FormulariocombustibleComponent;
  let fixture: ComponentFixture<FormulariocombustibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariocombustibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariocombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
