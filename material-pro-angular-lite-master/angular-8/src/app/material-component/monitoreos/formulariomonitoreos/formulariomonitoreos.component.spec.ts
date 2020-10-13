import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariomonitoreosComponent } from './formulariomonitoreos.component';

describe('FormulariomonitoreosComponent', () => {
  let component: FormulariomonitoreosComponent;
  let fixture: ComponentFixture<FormulariomonitoreosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariomonitoreosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariomonitoreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
