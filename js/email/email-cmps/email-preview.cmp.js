export default {
    template: `
     <router-link :to="clickedMail" class="preview" :class="readClass" @click.native="openMail">  
            <span> {{mail.email}} </span>
            <span> {{mail.subject}} </span>
            <span @click.stop="toggleRead">✉</span>    
    </router-link>
    
    `,
    props: ['mail'],
    data(){
        return {
            
        }
    },
    methods: {
        openMail(){
            this.mail.isRead = true;
            // this.mail.isOpen = true;
            console.log(this.mail);
            this.$emit('isOpen', this.mail.isRead, this.mail);
        },
        toggleRead(){
            this.mail.isRead = !this.mail.isRead
            // this.mail.isOpen = false;
            this.$emit('isOpen', this.mail.isRead, this.mail)
        }
    },
    computed: {
        readClass(){
            return {read : this.mail.isRead === true}
        },
        clickedMail() {
            return '/email/' + this.mail.id
        }
    }
}