import {utilService} from './utils-service.js'
import {storageService} from './async-storage-service.js'



export const bookService = {
    query,
    remove,
    save,
    getById,
    saveReview,
    removeReview,
    getNeighsId
}

function query() {
    return storageService.query(BOOKS_KEY)
    .then((books) => {
      if(!books || !books.length){
        console.log('fromgBooks');
        addReviews(gBooks)
        utilService.saveToStorage(BOOKS_KEY, gBooks)
        return gBooks
      }
      addReviews(books)
      return books
    })
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function removeReview(book, reviewId){
    const reviewIdx = book.reviews.findIndex((review) => review.id === reviewId)
    book.reviews.splice(reviewIdx,1)
    return storageService.put(BOOKS_KEY, book)
}

function save(book) {
    return storageService.post(BOOKS_KEY, book)
}

function saveReview(book, review) {
    review.id = storageService._makeId()
    book.reviews.push(review);
    return storageService.put(BOOKS_KEY, book)
}

function getById(id) {
    return storageService.get(BOOKS_KEY, id)
}

function getNeighsId(id){
    return query()
    .then(books => {
      const bookIdx = books.findIndex(book => book.id === id)
      const neighIds = {
        prevId: bookIdx === 0 ? null : books[bookIdx-1].id,
        nextId: bookIdx === books.length-1 ? null : books[bookIdx+1].id
      }
      return neighIds
    })
}