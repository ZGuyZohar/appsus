import mailPreview from './email-preview.cmp.js'

export default {
    template: `
<section class="list-container">
    <div>
        <label for="search">Search for mail: </label> 
        <input type="text" id="search" v-model="filterBy.txt" placeholder="Search Mail">
        <label for="by-read">Filter By Read?</label>
        <input type="checkbox" v-model="filterBy.read" />
    </div>
    <table>
        <tr class="list-header">
            <td>Name</td>
            <td>Email</td>
            <td @click="toSortBy(0)">Subject</td>
            <td @click="toSortBy(1)">Date</td>
            <td> </td>
        </tr>
        <tbody class="list">
            <template v-if="emails"  v-for="mail in emails">
                <mail-preview @removeMail="removeMail" @isOpen="updateMail" :mail="mail" />
            </template>
        </tbody>
    </table>
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