import longText from '../book-cmps/details-long-text.cmp.js'
import addReview from '../book-cmps/add-review.cmp.js'
import reviewList from '../book-cmps/review-list.cmp.js'
import { bookService } from '../book-services/bookstore-service.js'
import { eventBus } from '../book-services/event-bus-service.js'
import appHeader from '../book-cmps/app-header.cmp.js'

export default {
    template: `
    <section v-if="book" class="preview-modal">
        <app-header/>
        <div class="book-detail">
            <img :src="book.thumbnail" />
            <div>
                <h1> Book title: - {{book.title}} </h1>
                <h2> Author: {{book.authors[0]}} <span>Published at: {{book.publishedDate}} </span></h2> 
                <long-text :txt="book.description" />
                <p>Page count: {{book.pageCount}}, {{pageCountText}} - <span :class="isPricey" >Price: {{currencySign}}{{book.listPrice.amount}}</span></p>
                <h3 v-if="book.listPrice.isOnSale">SALE!!!</h3>
                <p>{{publishedDateRate}}</p>
            </div>
        </div>
        <add-review @saved="saveReview" :book="book" />
        <review-list @remove="removeReview" :reviews="book.reviews" />
        <div class="page-links">
            <router-link to="/book">Go back</router-link>
            <router-link v-if="prevId" :to="prevBookLink">Previous Book</router-link>
            <router-link v-if="nextId" :to="nextBookLink">Next Book</router-link>
        </div>
    </section>
    `,
    data(){
        return {
            book: null,
            nextBookId: null,
            prevId: null,
            nextId: null
        }
    },
    methods: {
        loadCurrBook() {
            const id = this.$route.params.bookId;
            bookService.getById(id)
            .then(book => this.book = book);
            bookService.getNeighsId(id)
            .then(({prevId, nextId}) => {
                this.prevId = prevId;
                this.nextId = nextId
            })
        },
        saveReview(review){
            bookService.saveReview(this.book, review)
            .then(book => this.book = book)
            .then(book => {
                    const msg = {
                        txt: `Review saved succesfully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        },
        removeReview(reviewId){
            bookService.removeReview(this.book, reviewId)
            .then(book => this.book = book)
            .then(book => {
                    const msg = {
                        txt: 'Review deleted succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                })            
        }
    },
    computed: {
         nextBookLink() {
            return '/book/' + this.nextId
        }, 
        prevBookLink() {
            return '/book/' + this.prevId
        },
        currencySign(){
            if(this.book.listPrice.currencyCode === 'USD') return '$'
            else if(this.book.listPrice.currencyCode === 'ILS') return '₪'
            else return '€'
        },
        pageCountText(){
            if(this.book.pageCount > 500) return 'Long reading';
            else if(this.book.pageCount > 200) return 'Decent reading'
            if(this.book.pageCount < 100) return 'Light reading'
        },
        publishedDateRate(){
            let diff = 2021 - this.book.publishedDate;
            if(diff > 10) return 'Veteran Book'
            if(diff <= 1) return 'New!'
        },
        isPricey(){
            return {red : this.book.listPrice.amount >= 150, green : this.book.listPrice.amount <= 20}
        },
    },
    created(){
        this.loadCurrBook()
    },
    watch: {
        '$route.params.bookId'() {
            this.loadCurrBook()
        },
    },
    components: {
        longText,
        addReview,
        reviewList,
        appHeader
    }
}