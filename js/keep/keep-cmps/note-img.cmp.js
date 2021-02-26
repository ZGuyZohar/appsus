
export default {
    props: ['note'],
    template: `
<section class="note-img">
    <h3 @click="toggleInput">{{note.info.txt}} </h3>
    <input type="text" @change="updateTxt" v-if="showInput" v-model="txt"/>
    <img :src="note.info.url" />
</section>
    `,
    data(){
        return {
            showInput: false,
            txt: ''
        }
    },
    methods: {
        toggleInput(){
            this.showInput = true;
        },
        updateTxt(){
            this.$emit('updateTxt', this.txt, this.note)
            this.showInput = false;
        }
    }
}
