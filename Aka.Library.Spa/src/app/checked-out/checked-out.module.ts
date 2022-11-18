import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckedOutBooksComponent } from './checked-out-books/checked-out-books.component';
import { LibraryMatModule } from '../library-mat.module';
import { CheckedOutRoutingModule } from './checked-out-routing.module';
import { PreviousCheckedOutBooksComponent } from './previous-checked-out-books/previous-checked-out-books.component';

@NgModule({
  imports: [
    CommonModule,
    CheckedOutRoutingModule,
    LibraryMatModule
  ],
  exports: [
    CheckedOutBooksComponent,
    PreviousCheckedOutBooksComponent
  ],
  declarations: [
    CheckedOutBooksComponent,
    PreviousCheckedOutBooksComponent
  ]
})
export class CheckedOutModule { }
