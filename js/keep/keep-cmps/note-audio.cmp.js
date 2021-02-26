

export default {
    props:['info'],
    template: `
    <section class="note-audio">
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
       
         <input type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
      <audio width="250"  height="200" :src="note.info.audio"></audio>
    </section>
    `,
    props: ['note'],
    data(){
        return {
            showInput: false,
            txt:''
           
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
