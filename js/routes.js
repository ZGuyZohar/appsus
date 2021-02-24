import keepApp from './pages/keep.cmp.js'

const routes = [
    // {
    //     path: '/',
    //     component: homePage,
    // },
    {
        path: '/keep',
        component: keepApp
    },
    // {
    //     path: '/about',
    //     component: about,
    //     children: [
    //         {
    //             path: 'team',
    //             component: aboutTeam
    //         },
    //         {
    //             path: 'services',
    //             component: aboutServices
    //         },
    //     ]
    // },

]

export const myRouter = new VueRouter({ routes })