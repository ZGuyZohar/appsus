import {emailService} from '../services/email-storage-service.js'
import asideNav from '../email-cmps/aside-nav.cmp.js'
import mailList from '../email-cmps/email-list.cmp.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav @filter="setFilter" @sent="sendMail" />
        <mail-list v-if="emails" @isOpen="updateMail" :emails="mailsToShow" />
    </section>
    `,
    data(){
        return {
            emails: [],
            filterBy: null
        }
    },
    methods: {
        loadEmails(){
            emailService.query()
            .then(emails => this.emails = emails)
            
        },
        updateMail(currMail){
            emailService.getIdxById(currMail.id)
            .then(idx => {
                this.emails[idx].isRead = currMail.isRead;
                return this.emails[idx];
            })
            .then((mail) => emailService.updateMail(mail))
        },
        sendMail(newMail){
            emailService.save(newMail)
            .then(this.loadEmails)
        },
        setFilter(filter){
            this.filterBy = filter;
            console.log('worked!', filter);
        }
    },
    computed: {
        mailsToShow(){
            if(this.filterBy === 'inbox' || !this.filterBy) {
                return this.emails.filter(mail => {
                    return !mail.isSent
                })
            }
            if(this.filterBy === 'sent'){
                return this.emails.filter(mail => {
                    return mail.isSent
                })
            }
        }
    },
    created(){
        this.loadEmails();
        eventBus.$on('send-filter', filter => {return this.setFilter(filter)})
    },
    destroyed(){
            eventBus.$off('send-filter', (filter) => {
            this.filterBy = filter
            console.log(this.filterBy,'from bus');
        })
    },
    components: {
        asideNav,
        mailList
    }
}