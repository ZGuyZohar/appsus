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
        <div @click.self="closeComposer" :class="showModal" class="composer-container">
            <section v-if="getMailComposer" class="composer">
                <button @click="closeComposer">Close</button>
                <form @submit.prevent="createMail(name, email, subject, body)"  >
                    <input type="email" v-model="email" placeholder="To: 'e.g. example@gmail.com'" />
                    <input type="text" v-model="name" placeholder="From" />
                    <input type="text" v-model="subject" placeholder="Subject" />
                    <textarea rows="23" v-model="body" cols="70"> </textarea>
                    <div class="composer-buttons">
                        <button>Send</button>
                        <button @click="sendToKeep">Transfer To Keep</button>
                    </div>
                </form>
            </section>
        </div>
    </section>
    `,
    props: ['emails', 'mail', 'query'],
    data(){
        return {
            getMailComposer: null,
            name: '',
            email: '',
            subject: '',
            body: '',
            read: 0,
            currMail: null,    
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
            const newMail = emailService._createMail(subject, body, name, email);
            this.getMailComposer = false;
            utilService.saveToStorage('composer', this.getMailComposer);
            this.$emit('sent', newMail);
        },
        filterBy(filter){
            this.$emit('filter', filter)
            // if(this.$router.history.current.path !== '/email') this.$router.push('/email/').catch(() => {})
        },
        amountRead(){
            if(!this.emails) return
            this.read = 0
            this.emails.forEach((mail) => {
                if(mail.isRead) this.read += 1;
            })            
        },
        sendToKeep(){
            this.$router.push({ path: '/keep/keep-page', query: { txt: this.body }})
        }
    },
    computed: {
        readInPercent(){
            return parseInt(this.read / this.emails.length  * 100) + '%'
        },
        showModal(){
            return {'show-modal' : !this.getMailComposer}
        }
    },
    created(){
        const composer = utilService.loadFromStorage('composer');
        this.getMailComposer = composer;
        this.amountRead()
        if(this.query) {
            this.body = this.query
            this.getMailComposer = true;
            utilService.saveToStorage('composer', this.getMailComposer);
        }
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