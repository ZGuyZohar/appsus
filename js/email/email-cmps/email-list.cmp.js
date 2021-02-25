import mailPreview from './email-preview.cmp.js'

export default {
    template: `
    <table>
        <tr>    
        <input type="text">
        <input type="checkbox" v-model="filterByRead" />
        </tr>
        <tr class="list-header">
            <td>Name</td>
            <td>Email</td>
            <td>Subject</td>
            <td>Date</td>
        </tr>
        <tbody class="list">
            <template v-if="emails"  v-for="mail in emails">
                <mail-preview @isOpen="updateMail" :mail="mail" />
            </template>
        </tbody>
    </table>
    `,
    props: ['emails'],
    data(){
        return {
            filterByRead: null
        }
    },
    methods: {
        updateMail(mail){
            this.$emit('isOpen', mail)
        },
        filter(){
            this.$emit('filter', this.filterByRead)
        }
    },
    components: {
        mailPreview
    },
    watch: {
        filterByRead(){
            this.filter()
        }
    }

}