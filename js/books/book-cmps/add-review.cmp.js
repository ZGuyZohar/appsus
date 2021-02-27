export default {
    template: `
    <section>
        <h1>Review book </h1>
        <form class="add-review" @submit.prevent="save"> 
        <label for="name">Name:</label>
        <input ref="elName" v-model="name" type="text" id="name" placeholder="Your name" />
        <label for="rating">Rating:</label>
        <select v-model="rating" id="rating"> 
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <label for="date">Read at:</label>
        <input v-model="date" type="date" id="date"/>
        <textarea v-model="comment"> </textarea>
        <button>Enter review </button>
        </form>
    </section>`,
    data(){
        return {
            name: 'Books Reader',
            rating: null,
            date: new Date().toISOString().slice(0,10),
            comment: null,
        }
    },
    methods: {
        save(){
            const newReview = {
                name: this.name,
                rating: this.rating,
                date: this.date,
                comment: this.comment
            }
            this.$emit('saved', newReview);
            this.name = '';
            this.rating = null;
            this.comment = '';

            
        }
    },
    mounted(){
        this.$refs.elName.focus()
    }

}