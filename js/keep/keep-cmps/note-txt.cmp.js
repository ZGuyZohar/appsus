export default {
    template: `
    <section @click.self="removeInput" class="note note-txt">
    <h3 class="h3-keep">Note:</h3>
        <h3 @click="toggleInput">{{note.info.txt}} </h3>
        <input class="keep-input" type="text" @change="updateTxt" v-if="showInput" v-model="txt" />
        <button class="keep-delete"  @click="deleteTxt">Delete</button> 
        <button class="keep-transfer" @click="sendToMail" >Transfer to mail</button>
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
        },
        removeInput(){
            this.showInput = false;
        },
        sendToMail(){
            this.$router.push({ path: '/email/', query: { txt: this.note.info.txt }})
        }
    }
}
