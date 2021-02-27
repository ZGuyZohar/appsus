export default {
    props: ['book'],
    template: `
    <section>
    <div>
        <h1>{{book.title}}</h1>
        <div class="image-book"><img :src="book.thumbnail" /></div>
        
        <p>{{currencySign}} {{book.listPrice.amount}}</p>
        </div>
    </section>
    `,
    date(){
        return {}
    },
    computed: {
        currencySign(){
            if(this.book.listPrice.currencyCode === 'USD') return '$'
            else if(this.book.listPrice.currencyCode === 'ILS') return '₪'
            else return '€'
        }
    }
}