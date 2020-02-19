import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBlankComponent } from './profile-blank.component';

describe('ProfileBlankComponent', () => {
  let component: ProfileBlankComponent;
  let fixture: ComponentFixture<ProfileBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
