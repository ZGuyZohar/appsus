import { bookService } from '../book-services/bookstore-service.js'
import bookList from '../book-cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookFilter from '../book-cmps/book-filter.cmp.js'
import searchFilter from './add-book.cmp.js'
import appHeader from '../book-cmps/app-header.cmp.js'


export default {
    template: `
    <section class="list-container-book">
        <app-header />
        <h1>Book Store</h1>
        <book-filter @filteredBy="setFilterBy" />
        <book-list @remove="removeBook" @select="previewBook" :books="booksToShow" />
    </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: 350
            }
        }
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        removeBook(currId){
            bookService.remove(currId)
            .then(this.loadBooks)
        },
        previewBook(currBook){
            this.selectedBook = currBook;
        },
        setFilterBy(input, mode){
            if(mode === -1) this.filterBy.name = input;
            if(mode === 0) this.filterBy.fromPrice = input;
            if(mode === 1) this.filterBy.toPrice = input;
        }
    },
    computed: {
        booksToShow(){
            if(!this.filterBy.name && !this.filterBy.fromPrice && !this.filterBy.toPrice) return this.books
            const searchStr = this.filterBy.name.toLowerCase()
            const booksToShow = this.books.filter(book => {
                if (book.title.toLowerCase().includes(searchStr) && 
                book.listPrice.amount > this.filterBy.fromPrice && book.listPrice.amount < this.filterBy.toPrice) return book
            })
            return booksToShow
        }
    },
    created(){
        this.loadBooks();
    },
    components: {
        bookList,
        bookDetails,
        bookFilter,
        searchFilter,
        appHeader    
    }
    
}
