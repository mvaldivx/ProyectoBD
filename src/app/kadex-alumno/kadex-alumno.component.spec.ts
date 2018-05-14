import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KadexAlumnoComponent } from './kadex-alumno.component';

describe('KadexAlumnoComponent', () => {
  let component: KadexAlumnoComponent;
  let fixture: ComponentFixture<KadexAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KadexAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KadexAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
