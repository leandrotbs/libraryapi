import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MemberService } from '../../services/member.service';
import { AuthService } from '../../services/auth.service';
import { SignedOutBook } from '../../shared/signed-out-book';
import { map, mergeAll } from 'rxjs/operators';
import { forkJoin, zip } from 'rxjs';
import { SignedOutBookDetails } from '../../shared/signed-out-book-details';
import { LibrariesService } from '../../services/libraries.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-previous-checked-out-books',
  templateUrl: './previous-checked-out-books.component.html',
  styleUrls: ['./previous-checked-out-books.component.scss']
})
export class PreviousCheckedOutBooksComponent implements OnInit, AfterViewInit {
  displayedColumns = ['libraryBookSid', 'libraryName', 'bookName', 'whenSignedOut', 'whenReturned'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private libraryService: LibrariesService,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.memberService.getMemberBookHistory(this.authService.currentMember)
      .pipe(
        map((signedOutBooks: SignedOutBook []) => {
          const obss = signedOutBooks.map(signedOutBook => forkJoin([
              this.libraryService.getLibrary(signedOutBook.libraryId),
              this.booksService.getBook(signedOutBook.libraryId, signedOutBook.bookId)
            ])
            .pipe(
              map(([library, book]) => ({ ...signedOutBook, libraryName: library.name, bookName: book.title }))
            )
          );

          return zip(...obss);
        }),

        mergeAll()
      )
      .subscribe((signedOutBooksDetails: SignedOutBookDetails []) => {
        this.dataSource.data = signedOutBooksDetails;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
