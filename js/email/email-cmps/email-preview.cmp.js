

export default {
    template: `
     <router-link to="/email" class="preview" @click.native="openMail" :class="readClass" >  
            <span> {{mail.name}} </span>
            <span> {{mail.email}} </span>
            <span> {{mail.subject}} </span>
            <span> {{mail.sentAt}} </span>
            <span @click.stop="toggleRead">✉</span>    
    </router-link>
    `,
    props: ['mail'],
    data(){
        return {
            isOpen: false,
        }
    },
    methods: {
        openMail(){
            this.mail.isRead = true;
            this.isOpen = true;
            this.$emit('isOpen', this.mail);
            this.clickedMail();
        },
        toggleRead(){
            this.mail.isRead = !this.mail.isRead
            this.$emit('isOpen', this.mail)
        },
        clickedMail(){
            if(this.isOpen) this.$router.push('/email/' + this.mail.id)
        }
    },
    computed: {
        readClass(){
            return {read : this.mail.isRead === true}
        },
    }
}