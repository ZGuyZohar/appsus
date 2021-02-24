import mailPreview from './email-preview.cmp.js'

export default {
    template: `
        <ul class="list">
            <template v-if="emails"  v-for="mail in emails">
                <mail-preview @isOpen="updateMail" :mail="mail" />
            </template>
        </ul>
    `,
    props: ['emails'],
    methods: {
        updateMail(isRead, mail){
            this.$emit('isOpen', isRead, mail)
        }
    },
    components: {
        mailPreview
    }

}