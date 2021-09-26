import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCasaComponent } from './user-casa.component';

describe('UserCasaComponent', () => {
  let component: UserCasaComponent;
  let fixture: ComponentFixture<UserCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
