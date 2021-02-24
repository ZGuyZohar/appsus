export default {
    props: [''],
    template: `
<section class="keep-note-img">
   
<div :bind="note" @change.prevent="reportNote">img</div>
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
