// https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80

export default {
    props: ['note'],
    template: `
<section class="note-img">
    <h3 @click="toggleInput">{{note.info.txt}} </h3>
    <button @click="deleteTxt">delete</button>
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
        },
        deleteTxt(){
            this.$emit('deleteTxt', this.txt, this.note)
            this.showInput = false;
        }
    }
}
