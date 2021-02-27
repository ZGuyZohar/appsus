export default {
    template: `
    <section class="note-txt">
    <h3 class="h3-keep">Note:</h3>
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
        <button class="keep-delete"  @click="deleteTxt">delete</button> 
         <input class="keep-input" type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
      <p>*click text to update</P>
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
