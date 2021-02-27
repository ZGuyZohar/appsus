export default {
    props: ['txt'],
    template: `
    <section>
        <p v-if="!isShort">{{shortTxt}}<span @click="isShort = !isShort" >...Read more.</span></p>
        <p v-else>{{txt}} <span @click="isShort = !isShort" >...Read less.</span></p>
    </section>
    `,
    data(){
        return {
            isShort: null
        }
    },
    computed: {
        shortTxt(){           
            if(this.txt.length < 100) return this.txt
            else return this.txt.substr(0,99);
        }
    }
}