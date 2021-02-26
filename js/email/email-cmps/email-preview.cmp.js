

export default {
    template: `
     <router-link to="/email" class="preview" @mouseenter.native="showFeatures" @mouseleave.native="hideFeatures" @click.native="openMail" :class="readClass" >  
            <li> {{mail.name}} </li>
            <li class="subject"> {{mail.subject}} </li>
            <li class="sent-at"> {{mail.sentAtToShow}} </li>
            <div class="features"><span v-if="toggleFeatures" @click.stop="removeMail">🗑</span> <span v-if="toggleFeatures" @click.stop="toggleRead">✉</span>  </div>  
        </router-link>
    `,
    props: ['mail'],
    data(){
        return {
            isOpen: false,
            toggleFeatures: false,
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
        removeMail(){
            this.$emit('removeMail', this.mail.id);
        },
        clickedMail(){
            if(this.isOpen) this.$router.push('/email/' + this.mail.id)
        },
        showFeatures(){
           this.toggleFeatures = true;
        },
        hideFeatures(){
            this.toggleFeatures = false;
        }
    },
    computed: {
        readClass(){
            return {read : this.mail.isRead === true}
        }
    }
}