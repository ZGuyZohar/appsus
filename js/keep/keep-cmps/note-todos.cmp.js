export default {
    props: [''],
    template: `
<section class="keep-note-todos">
   
<div :bind="note" @change.prevent="reportNote">todos</div>
      </section>
    `,
    data() {
        return {
            note: ''
    }
},
methods: {
    reportNote() {
        this.$emit('setNote' , this.note)
    }
}
}
