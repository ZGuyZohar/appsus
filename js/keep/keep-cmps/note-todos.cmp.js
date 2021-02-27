

export default {
    props:['info'],
    template: `
    <section @click.self="removeInput" class="note note-todos">
        <h3 class="h3-keep">Todos:</h3>
        <ul @click="toggleInput" v-for="(todo, idx) in listTodos">
            <li @click="setCurrTxt(todo, idx)">{{todo}}</li>
            <input class="keep-input" type="text"  @change="updateTxt" v-if="showInput && currTxt.id === idx" v-model="currTxt.txt" />
        </ul> 
       
        <button class="keep-delete" @click="deleteTxt">Delete</button>
        <button class="keep-transfer" @click="sendToMail" >Transfer to mail</button>
    </section>
    `,
    props: ['note'],
    data(){
        return {
            showInput: false,
            currTxt: {
                txt: '',
                id: null
            },
            listTodos: [] 
        }
    },
    methods: {  
        toggleInput(){
            this.showInput = true;
        },
        setCurrTxt(todo,idx){
            this.currTxt.txt = todo + '';
            this.currTxt.id = idx
        },
        updateTxt(){
            let id = 0
            this.listTodos.forEach((todo, idx) => {
                if(idx === this.currTxt.id) {
                    this.listTodos[idx] = this.currTxt.txt;
                    id=idx
                }
            })
            console.log(this.listTodos)
            this.$emit('updateTxt', this.listTodos[id], this.note, id)
            this.showInput = false;
        },
        deleteTxt(){
            this.$emit('deleteTxt', this.txt, this.note)
            this.showInput = false;
        },
        createTodos(){
           this.listTodos =  this.note.info.txt 
        },
        removeInput(){
            this.showInput = false;
        },
        sendToMail(){
            this.$router.push({ path: '/email/', query: { txt: this.listTodos.join(' ') }})
        }
    },
    created() {
        this.createTodos()
    }
}
