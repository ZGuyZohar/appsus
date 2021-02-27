import appHeader from '../cmps/app-header.cmp.js'



export default {
    name: 'home-page',
    template: `
    <section class="home app-main">
    <h1 class="home-header">Welcome to Appsus</h1>
    <div class="home-container">   
   <router-link  style="text-decoration: none" to="/keep/keep-page">     <div class="home-card"><h1 class="home-title">Keep</h1></div></router-link>
    <router-link  style="text-decoration: none" to="/email">   <div class="home-card"><h1>E-Mail</h1> </div></router-link>
     <router-link  style="text-decoration: none" to="book">  <div class="home-card"><h1>Books</h1> </div></router-link>
    
       </div>
<footer><p> &copy; Coffeerights 2021</p></footer>
    </section>
    `,
    components: {
        appHeader,

    },
}