import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousCheckedOutBooksComponent } from './previous-checked-out-books.component';

describe('PreviousCheckedOutBooksComponent', () => {
  let component: PreviousCheckedOutBooksComponent;
  let fixture: ComponentFixture<PreviousCheckedOutBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousCheckedOutBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousCheckedOutBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
