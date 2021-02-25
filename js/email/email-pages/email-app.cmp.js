import {emailService} from '../services/email-storage-service.js'
import asideNav from '../email-cmps/aside-nav.cmp.js'
import mailList from '../email-cmps/email-list.cmp.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav :mail="currMail" :emails="emails" @filter="setFilterBySent" @sent="sendMail" />
        <mail-list v-if="emails" @filter="setFilterByRead" @isOpen="updateMail" :emails="mailsToShow" />
    </section>
    `,
    data(){
        return {
            emails: [],
            filterBy: null,
            filterByRead: null,
            currMail: null
        }
    },
    methods: {
        loadEmails(){
            emailService.query()
            .then(emails => this.emails = emails)
            
        },
        updateMail(currMail){
            this.currMail = currMail
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
        setFilterBySent(filter){
            this.filterBy = filter;
        },
        setFilterByRead(filter){
            this.filterByRead = filter
        }
    },
    computed: {
        mailsToShow(){
            if(this.filterBy === 'inbox' || !this.filterBy) {
                const sentBy = this.emails.filter(mail => {
                    return !mail.isSent
                })
                if(this.filterByRead){
                    return this.emails.filter(mail => {
                        return mail.isRead && !mail.isSent
                    })
                } else return sentBy
            }
            if(this.filterBy === 'sent'){
                const sentBy = this.emails.filter(mail => {
                    return mail.isSent
                })
                if(this.filterByRead){
                    return this.emails.filter(mail => {
                        return mail.isRead && mail.isSent
                    })
                } else return sentBy
                
            }
        }
    },
    created(){
        this.loadEmails();
        eventBus.$on('send-filter', filter => {return this.setFilterBySent(filter)})
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