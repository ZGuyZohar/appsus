import appHeader from '../cmps/app-header.cmp.js'



export default {
    name: 'home-page',
    template: `
    <section class="home app-main">
    <h1 class="home-header">Welcome to Appsus</h1>
    <div class="home-container">   
   <router-link class="home-card" style="text-decoration: none" to="/keep/keep-page">     
        <div class="card-content">
            <img src="../../styles/imgs/keep-intro.png"/>
            <h2>Keep</h2>
            <p>Keep helps keep you organized, I simple and powerful app to keep notes, add todo lists, save images and more.</p>
        </div>
   </router-link>
    <router-link class="home-card" style="text-decoration: none" to="/email"> 
            <div class="card-content">
            <img src="../../styles/imgs/mail-intro.png"/>
            <h2>Email</h2>
            <p>Our email app is clean and simple, join us and find the easiest way to send emails to your close ones.</p>
        </div>
    </router-link>
    
     <router-link class="home-card"  style="text-decoration: none" to="book">  
        <div class="card-content">
            <img src="../../styles/imgs/book-intro.png"/>
            <h2>Books</h2>
            <p>Search for a book you like! Leave a review and learn about it more.</p>
        </div>
    </router-link>
    
       </div>

<!-- <footer><p> &copy; Coffeerights 2021</p></footer> -->
    </section>
    `,
    components: {
        appHeader,

    },
}