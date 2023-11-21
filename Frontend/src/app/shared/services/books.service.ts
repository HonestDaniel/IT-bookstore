import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Book, Data} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly booksUrl = 'assets/books.json';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Data> {
    return this.http.get<Data>(this.booksUrl);
  }

  getBook(bookISBN13: string): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map((data: Data) => {
        return data.books.find((book: Book) => book.isbn13 === bookISBN13);
      })
    );
  }
}
