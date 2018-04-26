import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalMaestrosComponent } from './principal-maestros.component';

describe('PrincipalMaestrosComponent', () => {
  let component: PrincipalMaestrosComponent;
  let fixture: ComponentFixture<PrincipalMaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalMaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
