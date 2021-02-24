
export default {
    props: ['info'],
    template: `
<section class="keep-note-txt">

    <div :bind="note" @change.prevent="reportNote" @setNote="setAns($event)">{{info}}</div>

      </section>
    `,
    data() {
        return {
            note: '',
           
            
    }
},
methods: {
    reportNote() {
        this.$emit('setNote' , this.note)
    },
    setAns() {
        console.log('check')
}
}
}
