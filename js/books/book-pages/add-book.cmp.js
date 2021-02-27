import { bookService } from '../book-services/bookstore-service.js'
import appHeader from '../book-cmps/app-header.cmp.js'

export default {
    template: `
    <section class="add-container-book">
        <app-header/>
        <h1> Add book </h1>
        <input type="text" v-model="search" placeholder="Search for a book">
        <ul class="add-list-book">
            <li v-if="foundBooks" v-for="book in foundBooks">{{book.volumeInfo.title}}  <span @click="addBook(book)">+</span></li>
        </ul>
    </section>`,
    data(){
        return {
            search: null,
            foundBooks: null
        }
    },
    methods: {
        addBook(book){
            const info = book.volumeInfo
            const isSale = book.saleInfo.saleability === 'NOT_FOR_SALE' ? false : true
            const newBook = {
                id: book.id,
                title: info.title,
                authors: info.authors[0],
                categories: info.categories,
                description: info.description,
                language: info.language,
                publishedDate: info.publishedDate,
                pageCount: info.pageCount,
                thumbnail: info.imageLinks.thumbnail,
                reviews: [],
                listPrice: {
                    amount: Math.floor(Math.random() * (300 - 10 + 1)) + 10,
                    currencyCode: 'USD',
                    isOnSale: isSale
                }
            }
            bookService.save(newBook)
        }
    },
    
    watch: {
        search(){
            bookService.addGoogleBook(this.search)
            .then(res => this.foundBooks = res)
            .then(() => console.log(this.foundBooks))
        }
    },
    components: {
        appHeader
    }
}