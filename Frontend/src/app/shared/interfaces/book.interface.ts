export interface Data {
  error: number,
  total: number,
  books: Book[]
}

export interface Book {
  price: string,
  title: string,
  subtitle: string,
  isbn13: string,
  image: string
}
