import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTweetsComponent } from './post-tweets.component';

describe('PostTweetsComponent', () => {
  let component: PostTweetsComponent;
  let fixture: ComponentFixture<PostTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
