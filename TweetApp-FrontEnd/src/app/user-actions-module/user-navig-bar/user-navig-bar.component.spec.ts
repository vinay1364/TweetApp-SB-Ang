import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavigBarComponent } from './user-navig-bar.component';

describe('UserNavigBarComponent', () => {
  let component: UserNavigBarComponent;
  let fixture: ComponentFixture<UserNavigBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNavigBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavigBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
