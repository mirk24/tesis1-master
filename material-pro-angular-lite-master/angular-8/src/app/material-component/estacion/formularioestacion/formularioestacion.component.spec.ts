import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioestacionComponent } from './formularioestacion.component';

describe('FormularioestacionComponent', () => {
  let component: FormularioestacionComponent;
  let fixture: ComponentFixture<FormularioestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioestacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
