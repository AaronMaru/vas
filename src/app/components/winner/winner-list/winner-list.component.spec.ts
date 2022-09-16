import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerListComponent } from './winner-list.component';

describe('WinnerListComponent', () => {
  let component: WinnerListComponent;
  let fixture: ComponentFixture<WinnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
