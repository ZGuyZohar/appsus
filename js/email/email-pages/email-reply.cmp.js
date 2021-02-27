import asideNav from '../email-cmps/aside-nav.cmp.js'
import {emailService} from '../services/email-storage-service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav :emails="emails" @filter="setFilter" />
        <ul class="mail-details reply" v-if="mail"> 
            <li>{{mail.subject}} </li>
            <li>{{mail.name}} - {{mail.email}}</li>
            <li class="date-delete"><small>{{mail.sentAtToShow}}</small> <span @click="removeMail">Delete</span></li>
<hr>        
            <li> <input type="text" v-model="" />
            <li><textarea v-model="txtToReply">{{txtForReply}}</textarea> </li>
        </ul>
        <pre>{{txtToReply}}</pre>
    </section>`
    ,
    data(){
        return {
            mail: null,
            emails: null,
            addedTxt: ` ===================================================================
Re:`,
            txtToReply: ''
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
        },
        setTxtToReply(){
            return this.txtToReply = this.mail.body + this.addedTxt
        }
    },
    computed: {
        txtForReply(){
            return this.mail.body + this.addedTxt
        }
    },
    components: {
        asideNav
    },
    created(){
        const id = this.$route.params.id
        emailService.getById(id)
            .then(mail => this.mail = mail)
            .then(this.setTxtToReply)
        this.loadEmails()
    }
}