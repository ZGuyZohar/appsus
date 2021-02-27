import {emailService} from '../services/email-storage-service.js'
import asideNav from '../email-cmps/aside-nav.cmp.js'
import mailList from '../email-cmps/email-list.cmp.js'
import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="email">
        <aside-nav :mail="currMail" :emails="emails" @filter="setFilterBySent" @sent="sendMail" />
        <mail-list v-if="emails" @removeMail="removeMail" @sortBy="sortBy" @filter="setFilterByRead" @isOpen="updateMail" :emails="mailsToShow" />
    </section>
    `,
    data(){
        return {
            emails: [],
            filterBy: null,
            filterByRead: null,
            filterByTxt: '',
            currMail: null,
            showToggle: {
                byName: false,
                byDate: false
            }
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
        removeMail(mailId){
            emailService.remove(mailId)
            .then(this.loadEmails);
            const msg = {
                    txt: `Email deleted succesfully`,
                    type: 'success'
                }
            eventBus.$emit('show-msg', msg)
        },
        sendMail(newMail){
            emailService.save(newMail)
            .then(this.loadEmails)
            const msg = {
                    txt: `Email sent succesfully`,
                    type: 'success'
                }
            eventBus.$emit('show-msg', msg)
        },
        setFilterBySent(filter){
            this.filterBy = filter
        },
        setFilterByRead(filter, mode){
            if (mode===0) {
                this.filterByRead = filter;
            }
           if(mode===1) {
               this.filterByTxt = filter;
            }            
        },
        sortBy(mode){
            if(mode === 0){
                this.showToggle.byName = !this.showToggle.byName
                if(this.showToggle.byName){
                    return this.emails.sort((mail1, mail2) => {
                        return mail1.subject.localeCompare(mail2.subject);
                    })
                } else {
                    return this.emails.sort((mail1, mail2) => {
                        return mail2.subject.localeCompare(mail1.subject);
                    })
                }
            } else {
                this.showToggle.byDate = !this.showToggle.byDate
                if (this.showToggle.byDate) {
                    return this.emails.sort((mail1, mail2) => {
                        return mail1.sentAt - mail2.sentAt;
                    });
                } else {
                    return this.emails.sort((mail1, mail2) => {
                        return mail2.sentAt - mail1.sentAt;
                    });
                }
            }
        }
    },
    computed: {
        mailsToShow(){
            let sentBy = this.emails
            if(this.filterBy === 'inbox' || !this.filterBy && !this.filterByTxt) {
                sentBy = this.emails.filter(mail => {
                    return !mail.isSent
                })
                if(this.filterByRead){
                    sentBy = this.emails.filter(mail => {
                        return mail.isRead && !mail.isSent
                    })
                } 
                return sentBy
            }
            if(this.filterBy === 'sent' && !this.filterByTxt){
                sentBy = this.emails.filter(mail => {
                    return mail.isSent
                })
                if(this.filterByRead){
                    sentBy = this.emails.filter(mail => {
                        return mail.isRead && mail.isSent
                    })
                }
                return sentBy
            }
            if(this.filterByTxt) {
                const searchStr = this.filterByTxt.toLowerCase()
                return this.emails.filter(mail => {
                    if (mail.subject.toLowerCase().includes(searchStr)) return mail
                })
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