import keepApp from './keep/keep-page.cmp.js'
import emailApp from './email/email-pages/email-app.cmp.js'
import emailDetails from './email/email-pages/email-details.cmp.js'
import emailReply from './email/email-pages/email-reply.cmp.js';
import homePage from './pages/home-page.cmp.js'
import bookApp from './books/book-pages/bookstore-app.cmp.js'
import addBook from './books/book-pages/add-book.cmp.js'
import bookDetails from './books/book-pages/book-details.cmp.js'

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
    {
        path: '/email/:id/reply',
        component: emailReply
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/add',
        component: addBook
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },

]

export const myRouter = new VueRouter({ routes })