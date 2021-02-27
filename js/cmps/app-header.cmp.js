export default {
    template: `
     <header class="app-header">
     <div @click.self="closeNav" :class="showNav" class="keep-responsive-container"></div>
     <router-link  style="text-decoration: none;" to="/"><h2 class="logo">Appsus</h2></router-link>
 
     <div class="nav-container">  
    <nav :class="setClassName" >
    <router-link class="nav-links open-menu" to="/keep/keep-page">Keep</router-link>
    <router-link class="nav-links open-menu" to="/email">E-Mail</router-link>
    <router-link class="nav-links open-menu" to="/book">Books</router-link>
   
</nav>
</div>
<button class="menu-btn"  @click="toggleMenu"  hidden>☰</button>

</header>
    `,
    data(){ 
        return{
        navOpen: null
    }
    },
    methods: {
        toggleMenu() {
        this.navOpen = !this.navOpen
    
        },
        closeNav() {
            this.navOpen  =false
        }
    },
    computed: {
        setClassName() {
            if (this.navOpen) return 'open-menu'
        },
        showNav(){
            return {'show-nav' :  !this.navOpen}
        }
    }
}