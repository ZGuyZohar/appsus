import asideNav from '../email-cmps/aside-nav.cmp.js'
import {emailService} from '../services/email-storage-service.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav v-if="emails" :emails="emails" @filter="setFilter" />
        <ul class="mail-details reply" v-if="mail"> 
            <li>{{mail.subject}} </li>
            <li>{{mail.name}} - {{mail.email}}</li>
            <li class="date-delete"><small>{{mail.sentAtToShow}}</small> <span @click="removeMail">Delete</span></li>
<hr>        
            <form @submit.prevent="createMail(subjectToReply, bodyToReply)">
            <li> <input type="text" v-model="subjectToReply" />
            <li><textarea v-if="bodyToReply" v-model="bodyToReply">{{bodyToReply}}</textarea> </li>
            <button>Submit</button>
            </form>
        </ul>
    </section>`
    ,
    data(){
        return {
            mail: null,
            emails: null,
            addedTxt: ` ===================================================================
Re:`,
            bodyToReply: '',
            subjectToReply: 'RE: '
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
        setbodyToReply(){
            return this.bodyToReply = this.mail.body + this.addedTxt
        },
        createMail(subject, body){
            const newMail = emailService._createMail(subject, body);
            newMail.email = this.mail.email;
            newMail.name = this.mail.name;
            emailService.save(newMail)
            this.$router.push('/email')
            const msg = {
                    txt: `Email created succesfully`,
                    type: 'success'
                }
            eventBus.$emit('show-msg', msg)
        },
    },
    computed: {
    },
    components: {
        asideNav
    },
    created(){
        const id = this.$route.params.id
        emailService.getById(id)
            .then(mail => this.mail = mail)
            .then(this.setbodyToReply)
        this.loadEmails()
    }
}