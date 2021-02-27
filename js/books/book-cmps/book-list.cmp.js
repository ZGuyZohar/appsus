import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <div class="list-book">
        <div v-for="book in books" class="card-book">
            <book-preview :book="book" />
            <div class="btns-container">
                <button @click="remove(book.id)">X</button>
                <router-link :to="'/book/'+book.id">Details</router-link>
            </div>
        </div>
    </div>`
    ,
    data(){
        return {

        }
    },
    methods: {
        remove(bookId){
            this.$emit('remove', bookId)
        },
        select(bookId){
            this.$emit('select', bookId)
        }
    },
    computed: {
    },
    components:{
        bookPreview,
    }

}