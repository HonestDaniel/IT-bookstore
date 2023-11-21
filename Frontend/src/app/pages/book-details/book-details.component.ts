import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../shared/services/books.service';
import {Book} from "../../shared/interfaces/book.interface";
import {CartService} from "../../shared/services/cart.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})

export class BookDetailsComponent implements OnInit {
  bookISBN13: string;
  book: Book | undefined;

  cartItems: { book: Book, quantity: number }[];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    const isbn13Param = this.route.snapshot.paramMap.get('isbn13');
    if (isbn13Param !== null) {
      this.bookISBN13 = isbn13Param;
      this.booksService.getBook(this.bookISBN13).subscribe((book: Book | undefined) => {
        this.book = book;
      });
    } else {
      console.warn('isbn13 is null')
    }

    this.cartService.cartItems$.subscribe(cartItems => {
      this.updateCartItems(cartItems);
    })
  }

  updateCartItems(cartItems: { book: Book, quantity: number }[]) {
    this.cartItems = [...cartItems];
  }

  getCartQuantity(book: Book | undefined): number | undefined {
    if (book) {
      const cartItem = this.cartItems.find(item => item.book.isbn13 === book.isbn13);
      return cartItem ? cartItem.quantity : 0;
    } else return undefined
  }

  addToCart(book: Book | undefined) {
    if (book) {
      this.cartService.addToCart(book);
      console.log(this.cartService.getCartItems())
    }
  }
}
