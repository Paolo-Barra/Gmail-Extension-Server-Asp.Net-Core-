import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoginOauthLandingPageComponent } from './post-login-oauth-landing-page.component';

describe('PostLoginOauthLandingPageComponent', () => {
  let component: PostLoginOauthLandingPageComponent;
  let fixture: ComponentFixture<PostLoginOauthLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLoginOauthLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLoginOauthLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
