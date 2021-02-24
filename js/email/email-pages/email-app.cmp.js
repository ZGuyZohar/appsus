import {emailService} from '../services/email-storage-service.js'
import asideNav from '../email-cmps/aside-nav.cmp.js'
import mailList from '../email-cmps/email-list.cmp.js'

export default {
    template: `
    <section class="email">
        <aside-nav />
        <mail-list v-if="emails" @isOpen="updateMail" :emails="emails" />
        <router-view v-if="" :mail="openMail" />
    </section>
    `,
    data(){
        return {
            emails: [],
            currMail: null
        }
    },
    methods: {
        loadEmails(){
            emailService.query()
            .then(emails => this.emails = emails)
        },
        updateMail(updatedVal, currMail){
            emailService.getIdxById(currMail.id)
            .then(idx => {
                this.emails[idx].isRead = updatedVal;
                this.emails[idx].isOpen = currMail.isOpen;
                this.currMail = currMail;
                console.log(this.currMail);
                return this.emails[idx];
            })
            .then((mail) => emailService.updateMail(mail))
        }
    },
    created(){
        this.loadEmails()
    },
    components: {
        asideNav,
        mailList
    }
}