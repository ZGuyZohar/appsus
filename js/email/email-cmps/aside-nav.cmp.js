import {utilService} from '../../services/utils.js'
import {emailService} from '../services/email-storage-service.js'

export default {
    template: `
    <section>
        <ul>
            <li @click="composeMail">Compose</li>
            <li @click="filterBy('inbox')">Inbox</li>
            <li>Starred</li>
            <li @click="filterBy('sent')">Sent</li>
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
    data(){
        return {
            getMailComposer: null,
            name: '',
            email: '',
            subject: '',
            body: ''            
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
        }
    },
    created(){
        const composer = utilService.loadFromStorage('composer');
        this.getMailComposer = composer;
    }
}