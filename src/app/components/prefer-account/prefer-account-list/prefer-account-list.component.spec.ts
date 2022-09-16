import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferAccountListComponent } from './prefer-account-list.component';

describe('PreferAccountListComponent', () => {
  let component: PreferAccountListComponent;
  let fixture: ComponentFixture<PreferAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
