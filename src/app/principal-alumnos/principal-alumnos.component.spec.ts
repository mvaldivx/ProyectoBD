import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAlumnosComponent } from './principal-alumnos.component';

describe('PrincipalAlumnosComponent', () => {
  let component: PrincipalAlumnosComponent;
  let fixture: ComponentFixture<PrincipalAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
