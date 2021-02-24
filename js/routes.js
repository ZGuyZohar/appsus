import keepApp from './keep/keep-page.cmp.js'
import emailApp from './email/email-pages/email-app.cmp.js'
import emailDetails from './email/email-pages/email-details.cmp.js'
import homePage from './pages/home-page.cmp.js'

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
    },
    {
        path: '/email/:id',
        component: emailDetails
    },

]

export const myRouter = new VueRouter({ routes })