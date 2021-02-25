import asideNav from '../email-cmps/aside-nav.cmp.js'
import {emailService} from '../services/email-storage-service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav :emails="emails" @filter="setFilter" />
        <ul v-if="mail"> 
            <li>{{mail.email}}  <span @click="removeMail">Delete</span></li>
            <li>{{mail.name}} - {{mail.sentAt}} </li>
            <li>{{mail.subject}} </li>
            <li><pre>{{mail.body}}</pre> </li>
        </ul>
    </section>
    `,
    data(){
        return {
            mail: null,
            emails: null
        }
    },
    methods: {
        loadEmails(){
            emailService.query()
            .then(emails => this.emails = emails)  
        },
        removeMail(){
            emailService.remove(this.mail.id);
            this.$router.push('/email')
        },
        setFilter(filter){
            this.$router.push('/email/').catch(() => {});
            eventBus.$emit('send-filter', filter)
            
        }
    },
    components: {
        asideNav
    },
    created() {
        const id = this.$route.params.id
        emailService.getById(id)
            .then(mail => this.mail = mail)
            this.loadEmails()
    }

}