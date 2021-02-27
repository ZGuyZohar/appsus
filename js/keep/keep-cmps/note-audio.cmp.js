

export default {
    props:['info'],
    template: `
    <section class="note-audio">
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
       
         <input type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
      <audio controls>
        <!-- <source src="horse.ogg" type="audio/ogg"> -->
        <source src="horse.mp3" type="audio/mpeg">
        </audio>
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
