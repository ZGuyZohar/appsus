import {emailService} from '../services/email-storage-service.js'
import asideNav from '../email-cmps/aside-nav.cmp.js'
import mailList from '../email-cmps/email-list.cmp.js'

export default {
    template: `
    <section class="email">
        <aside-nav />
        <mail-list v-if="emails" @isOpen="updateMail" :emails="emails" />
    </section>
    `,
    data(){
        return {
            emails: [],
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