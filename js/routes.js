import keepApp from './keep/keep-page.cmp.js'
import emailApp from './email/email-pages/email-app.cmp.js'

const routes = [
    // {
    //     path: '/',
    //     component: homePage,
    // },
    {
        path: '/keep',
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