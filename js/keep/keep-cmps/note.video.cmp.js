// https://www.dailymotion.com/video/x7r96w3
// https://d.tube/#!/v/brishtiteveja0595/xqzu6e6jbfs


export default {
    props:['info'],
    template: `
    <section class="note-video">
    <h3 class="h3-keep">My video</h3>
        <h3 @click="toggleInput"></h3>
        <button class="keep-delete" @click="deleteTxt">delete</button>
         <input class="keep-input" type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
      <iframe width="250"  height="200" :src="note.info.video"></iframe>
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
