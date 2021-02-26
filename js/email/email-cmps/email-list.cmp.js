import mailPreview from './email-preview.cmp.js'

export default {
    template: `
<section class="list-container">
    <div class="filter">
        <div>
            <label for="search">Search for mail: </label> 
            <input type="text" id="search" v-model="filterBy.txt" placeholder="Search by subject">
        </div>
        <div>        
            <label for="by-read">Filter By Read?</label>
            <input type="checkbox" v-model="filterBy.read" />
        </div>
    </div>
    <main>
        <div>
            <ul class="list-header">
                <li>Name</li>
                <li @click="toSortBy(0)">Subject</li>
                <li @click="toSortBy(1)">Date</li>
            </ul>
        </div>
        <ul class="list">
            <template v-if="emails" class="list-item" v-for="mail in emails">
                <mail-preview @removeMail="removeMail" @isOpen="updateMail" :mail="mail" />
            </template>
        </ul>
    </main>
</section>
    `,
    props: ['emails'],
    data(){
        return {
            filterBy: {
                read: null,
                txt: null
            },
        }
    },
    methods: {
        updateMail(mail){
            this.$emit('isOpen', mail)
        },
        removeMail(mailId){
            this.$emit('removeMail', mailId)
        },
        filter(mode){
            if(mode === 0) this.$emit('filter', this.filterBy.read, mode);
            if(mode === 1) this.$emit('filter', this.filterBy.txt, mode);
        },
        toSortBy(mode){
            if(mode === 0) this.$emit('sortBy', mode);
            if(mode === 1) this.$emit('sortBy', mode);
        }
    },
    components: {
        mailPreview
    },
    watch: {
        'filterBy.read'(){
            this.filter(0)
        },
        'filterBy.txt'(){
            this.filter(1)
        }
    }

}