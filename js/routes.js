import keepApp from './keep/keep-page.cmp.js'
import emailApp from './email/email-pages/email-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
// import email from './email/email-pages.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/keep/keep-page',
        component: keepApp
    },
    {
        path: '/email',
        component: emailApp,
        // children: [
        //     {
        //         path: 'team',
        //         component: aboutTeam
        //     },
        //     {
        //         path: 'services',
        //         component: aboutServices
        //     },
        // ]
    },

]

export const myRouter = new VueRouter({ routes })