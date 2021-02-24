import {emailService} from '../services/email-storage-service.js'

export default {
    template: `
    <section class="email">


    </section>
    `,
    data(){
        return {
            emails: []
        }
    },
    methods: {
        loadEmails(){

        }
    }
}