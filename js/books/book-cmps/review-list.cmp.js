export default {
    props: ['reviews'],
    template: `
    <section class="review-list">
        <h1> Reviews:</h1>
        <ul>
            <li v-for="review in reviews">{{review.name}} - {{review.rating}} Stars
                <p>Review: {{review.comment}} </p>
                <p>Date read: {{review.date}}</p>
                <button @click="removeReview(review.id)">X</button>
            </li>
        </ul>
    </section>
    `,
    methods: {
        removeReview(reviewId){
            this.$emit('remove', reviewId)
        }
    }
}