import asideNav from '../email-cmps/aside-nav.cmp.js'
import {emailService} from '../services/email-storage-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav />
        <ul v-if="mail"> 
            <li>{{mail.email}} </li>
            <li>{{mail.name}} - {{mail.sentAt}} </li>
            <li>{{mail.subject}} </li>
            <li><pre>{{mail.body}}</pre> </li>
        </ul>
    </section>
    `,
    data(){
        return {
            mail: null
        }
    },
    methods: {

    },
    components: {
        asideNav
    },
    created() {
        const id = this.$route.params.id
        console.log(id);
        emailService.getById(id)
            .then(mail => this.mail = mail)
    }

}