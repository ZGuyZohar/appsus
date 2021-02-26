import {utilService} from '../../services/utils.js'
import {emailService} from '../services/email-storage-service.js'

export default {
    template: `
    <section class="aside-nav">
        <ul>
            <li @click="composeMail">Compose</li>
            <li @click="filterBy('inbox')">Inbox</li>
            <li @click="filterBy('sent')">Sent</li>
            <li v-if="emails.length" class="read-count">Read: {{readInPercent}} </li>
        </ul>
        <section v-if="getMailComposer" class="composer">
            <button @click="closeComposer">Close</button>
            <form @submit.prevent="createMail(name, email, subject, body)"  >
                <input type="email" v-model="email" placeholder="Your Email" />
                <input type="text" v-model="name" placeholder="From" />
                <input type="text" v-model="subject" placeholder="Subject" />
                <textarea rows="23" v-model="body" cols="70"> </textarea>
                <button>Send</button>
            </form>
        </section>
    </section>
    `,
    props: ['emails', 'mail'],
    data(){
        return {
            getMailComposer: null,
            name: '',
            email: '',
            subject: '',
            body: '',
            read: 0,
            currMail: null         
        }
    },
    methods: {
        composeMail(){
            this.getMailComposer = true;
            utilService.saveToStorage('composer', this.getMailComposer);
        },
        closeComposer(){
            this.getMailComposer = false;
            utilService.saveToStorage('composer', this.getMailComposer);
        },
        createMail(name, email, subject, body){
            const newMail = emailService._createMail(name, email, subject, body);
            this.getMailComposer = false;
            utilService.saveToStorage('composer', this.getMailComposer);
            this.$emit('sent', newMail);
        },
        filterBy(filter){
            this.$emit('filter', filter)
            // if(this.$router.history.current.path !== '/email') this.$router.push('/email/').catch(() => {})
        },
        amountRead(){
            this.read = 0
            this.emails.forEach((mail) => {
                if(mail.isRead) this.read += 1;
            })            
        }
    },
    computed: {
        readInPercent(){
            return parseInt(this.read / this.emails.length  * 100) + '%'
        }
    },
    created(){
        const composer = utilService.loadFromStorage('composer');
        this.getMailComposer = composer;
        this.amountRead()
    },
    watch: {
        emails(){
            this.amountRead()
        },
        'mail.isRead'(){
            this.amountRead()
        },
        mail(){
            this.amountRead()
        }
   
    }
}