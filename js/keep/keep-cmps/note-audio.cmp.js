// https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3
// https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav

export default {
    props:['info'],
    template: `
    <section @click.self="removeInput" class="note note-audio">
        <h3 class="h3-keep">Audio:</h3>
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
        <input class="keep-input" type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
        <audio controls>
            <source :src="note.info.audio" type="audio/mpeg">
        </audio>
        <button class="keep-delete audio" @click="deleteTxt">Delete</button>
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
        },
        removeInput(){
            this.showInput = false;
        }
    }
}
