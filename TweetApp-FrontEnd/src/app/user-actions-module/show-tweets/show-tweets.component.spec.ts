import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTweetsComponent } from './show-tweets.component';

describe('ShowTweetsComponent', () => {
  let component: ShowTweetsComponent;
  let fixture: ComponentFixture<ShowTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
