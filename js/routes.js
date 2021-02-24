import keepApp from './keep/keep-page.cmp.js'
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
    // {
    //     path: '/email/email-pages',
    //     component: email,
    // }

            // {
            //     path: '/miss-book',
            //     component: missBook
            // },
    //         {
    //             path: 'services',
    //             component: aboutServices
    //         },
    //     ]
    // },

]

export const myRouter = new VueRouter({ routes })