import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'


const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section class="container">  
            <app-header />
            <router-view />
        </section>
    `,
    components: {
        appHeader,
      
    }
}

const app = new Vue(options)
