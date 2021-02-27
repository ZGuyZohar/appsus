// https://www.dailymotion.com/video/x7r96w3
// https://d.tube/#!/v/brishtiteveja0595/xqzu6e6jbfs


export default {
    props:['info'],
    template: `
    <section class="note-video">
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
        <button @click="deleteTxt">delete</button>
         <input type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
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