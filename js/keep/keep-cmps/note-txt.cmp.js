
export default {
    props: ['info'],
    template: `
<section class="keep-note-txt">
    {{note.type}}
    <br/>
    {{note.info.txt}}
    <div :bind="note" @change.prevent="reportNote"></div>
      </section>
    `,
    data() {
        return {
           note: {
                type: "NoteTxt",
                isPinned: true,
                info: {
                txt: "Fullstack Me Baby!"
                }
        }
    }
},
methods: {
    reportNote() {
        this.$emit('setNote' , this.note)
    }
}
}
