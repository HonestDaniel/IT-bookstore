import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Book} from "../interfaces/book.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<{book: Book; quantity: number}[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(book: Book, quantity: number = 1) {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItemIndex = currentCartItems.findIndex(item => item.book.title === book.title);

    if (existingItemIndex !== -1) {
      currentCartItems[existingItemIndex].quantity += quantity;
    } else {
      currentCartItems.push({ book: book, quantity });
    }

    this.cartItemsSubject.next(currentCartItems);
  }

  getCartItems() {
    return this.cartItemsSubject.value;
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

}
