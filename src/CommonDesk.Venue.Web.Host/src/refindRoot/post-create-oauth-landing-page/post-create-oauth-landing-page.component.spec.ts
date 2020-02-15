import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateOauthLandingPageComponent } from './post-create-oauth-landing-page.component';

describe('PostOauthLandingPageComponent', () => {
  let component: PostCreateOauthLandingPageComponent;
  let fixture: ComponentFixture<PostCreateOauthLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreateOauthLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateOauthLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
