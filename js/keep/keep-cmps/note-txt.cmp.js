export default {
    template: `
    <section class="note-txt">
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
        <button @click="deleteTxt">delete</button> 
         <input type="text" @change="updateTxt" v-if="showInput" v-model="txt" />      
    </section>
    `,
    props: ['note'],
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
