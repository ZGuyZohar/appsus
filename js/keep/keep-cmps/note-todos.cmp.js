

export default {
    props:['info'],
    template: `
    <section class="note-todos">
        <h3 class="h3-keep">Todo List:</h3>
       
        <ul @click="toggleInput" v-for="(todo, idx) in listTodos">
        <li @click="setCurrTxt(todo, idx)">{{todo}}</li>

        <input class="keep-input" type="text"  @change="updateTxt" v-if="showInput && currTxt.id === idx" v-model="currTxt.txt" />
        </ul> 
       
        <button class="keep-delete" @click="deleteTxt">delete</button>
         <p>*click text to update</P>
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
        }
    },
    created() {
        this.createTodos()
        console.log(this.listTodos)
    }
}
