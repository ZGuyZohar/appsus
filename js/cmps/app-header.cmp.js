export default {
    template: `
     <header class="app-header">
     
     <router-link  style="text-decoration: none;" to="/"><h2 class="logo">Appsus</h2></router-link>
    <nav>
    <router-link class="nav-links" to="/keep/keep-page">Keep</router-link>
    <router-link class="nav-links" to="/email">E-Mail</router-link>
    <router-link class="nav-links" to="/miss-book">Books</router-link>
    <!-- <router-link class="nav-links" to="/">Home</router-link> -->
</nav>
<button class="open-menu" v-if="navOpen" @click="toggleMenu" >☰</button>
</header>
    `,
    data(){ 
        return{
        navOpen: false
    }
    },
    methods: {
        toggleMenu() {
        this.navOpen = !this.navOpen
        }
    }
}