// https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3
// https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav

export default {
    props:['info'],
    template: `
    <section class="note-audio">
        <h3 class="h3-keep">My audio</h3>
        <h3 @click="toggleInput"> </h3>
        <button class="keep-delete audio" @click="deleteTxt">delete</button>
        <input class="keep-input" type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
        <audio controls>
            <source :src="note.info.audio" type="audio/mpeg">
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
        },
        deleteTxt(){
            this.$emit('deleteTxt', this.txt, this.note)
            this.showInput = false;
        }
    }
}
