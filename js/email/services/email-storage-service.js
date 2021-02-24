import {utilService} from './utils-service.js'
import {storageService} from '../../services/async-storage-service.js'

const EMAILS_KEY = 'emails';

export const emailService = {
    query,
    remove,
    save,
    getById,
    saveReview,
    removeReview,
    getNeighsId
}

function query() {
    return storageService.query(EMAILS_KEY)
    .then((emails) => {
      if(!emails || !emails.length){
        console.log('fromgMails');
        addReviews(gMails)
        utilService.saveToStorage(EMAILS_KEY, gMails)
        return gMails
      }
      addReviews(emails)
      return emails
    })
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}

function removeReview(email, reviewId){
    const reviewIdx = email.reviews.findIndex((review) => review.id === reviewId)
    email.reviews.splice(reviewIdx,1)
    return storageService.put(EMAILS_KEY, email)
}

function save(email) {
    return storageService.post(EMAILS_KEY, email)
}

function saveReview(email, review) {
    review.id = storageService._makeId()
    email.reviews.push(review);
    return storageService.put(EMAILS_KEY, email)
}

function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function getNeighsId(id){
    return query()
    .then(emails => {
      const mailIdx = emails.findIndex(email => email.id === id)
      const neighIds = {
        prevId: mailIdx === 0 ? null : emails[mailIdx-1].id,
        nextId: mailIdx === emails.length-1 ? null : emails[mailIdx+1].id
      }
      return neighIds
    })
}

const gMails = [
      {
        subject: 'Kaleb Walker has invited you to join his Git Repository!', 
        body: `Reply directly to this email to comment, and CC teammates to add them as collaborators.
        If you want to stop receiving notifications about this task, you can remove yourself from it.`, 
        isRead: false, 
        sentAt : 1551133990594
      },
      {
        subject: 'Looking to buy your car', 
        body: `Hey! My name is Yossi, 
        I saw your add about the Kia Rio you are selling, it looks pretty nice and I'd like to get some more information about it.
        Thanks!
        Sincerely, Yossi Bob`, 
        isRead: false, 
        sentAt : 1551133930594
      },
           {
        subject: 'Duuuude you missed the video call!', 
        body: `Where were you?! We were all waiting for you and finished the assignment by ourselves. 
        The teacher is pissed!`, 
        isRead: false, 
        sentAt : 1551133830594
      }
]