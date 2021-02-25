

export default {
    template: `
     <router-link to="/email" class="preview" @click.native="openMail" :class="readClass" >  
            <td> {{mail.name}} </td>
            <td> {{mail.email}} </td>
            <td> {{mail.subject}} </td>
            <td> {{mail.sentAt}} </td>
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