
import {storageService} from '../../services/async-storage-service.js'

const EMAILS_KEY = 'emails';

export const emailService = {
    query,
    remove,
    save,
    getById,
    getNeighsId,
    getIdxById,
    updateMail,
    _createMail
}

function query() {
    return storageService.query(EMAILS_KEY)
    .then((emails) => {
      if(!emails || !emails.length){
        console.log('fromGmails');
        storageService._save(EMAILS_KEY, gMails)
        return gMails
      }
      return emails
    })
}


function remove(mailId) {
    return storageService.remove(EMAILS_KEY, mailId)
}

function save(mail) {
    return storageService.post(EMAILS_KEY, mail)
}

function updateMail(mail){
  return storageService.put(EMAILS_KEY, mail)
}


function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function getIdxById(id){
    return query()
    .then(emails => emails.findIndex(mail => mail.id === id))
}

function getNeighsId(id){
    return query()
    .then(emails => {
      const mailIdx = emails.findIndex(mail => mail.id === id)
      const neighIds = {
        prevId: mailIdx === 0 ? null : emails[mailIdx-1].id,
        nextId: mailIdx === emails.length-1 ? null : emails[mailIdx+1].id
      }
      return neighIds
    })
}

function _createMail(name, email, subject, body ) {
    const mail = {
        id: storageService._makeId(),
        name,
        email,
        subject,
        body,
        isRead: false,
        sentAtToShow: new Date().toLocaleDateString(),
        sentAt: new Date().getTime(),
        isSent: true
    }
    return mail;
}

const gMails = [
      {
        id: storageService._makeId(),
        name: 'Kaleb Walker',
        email: 'kalebwalker93@gmail.com',
        subject: 'Kaleb Walker has invited you to join his Git Repository!', 
        body: `Reply directly to this email to comment, and CC teammates to add them as collaborators.
        If you want to stop receiving notifications about this task, you can remove yourself from it.`, 
        isRead: false, 
        sentAtToShow : new Date('September 14, 1997 12:24:00').toLocaleDateString(),
        sentAt: new Date('September 14, 1997 12:24:00').getTime(),
        isSent: false
      },
      {
        id: storageService._makeId(),
        name: 'Yossi Bob',
        email: 'bob_yossi67@yahoo.com',
        subject: 'Looking to buy your car.', 
        body: `Hey! My name is Yossi, 
        I saw your add about the Kia Rio you are selling, it looks pretty nice and I'd like to get some more information about it.
        Thanks!
        Sincerely, Yossi Bob`, 
        isRead: false,
        sentAtToShow : new Date('April 20, 2020 12:24:00').toLocaleDateString(),
        sentAt : new Date('April 20, 2020 12:24:00').getTime(),
        isSent: false
      },
      {
        id: storageService._makeId(),
        name: 'Coolio Peterson',
        email: 'cooldudez420@hotmail.com',
        subject: 'Duuuude you missed the video call!', 
        body: `Where were you?! We were all waiting for you and finished the assignment by ourselves. 
        The teacher is pissed!`, 
        isRead: false, 
        sentAtToShow : new Date('December 17, 1995 03:24:00').toLocaleDateString(),
        sentAt: new Date('December 17, 1995 03:24:00').getTime(),
        isSent: false
      },
      {
        id: storageService._makeId(),
        name: 'Rick Astley',
        email: 'rickboi@yahoo.com',
        subject: 'Never gonna give you up', 
        body: `You know the rules, And so do I!! Haha great party last night! `, 
        isRead: false, 
        sentAtToShow : new Date('May 23, 2020 14:24:00').toLocaleDateString(),
        sentAt: new Date('May 23, 2020 14:24:00').getTime(),
        isSent: false
      },
      {
        id: storageService._makeId(),
        name: 'Pepitoz Vidal',
        email: 'pepitoz93@yahoo.com',
        subject: 'Rick Astley hit on my girlfriend last night!', 
        body: `Usually I'd be mad about something like this.. but it's Rick Astley!!!
        I can show off that Rick Astley hit on my girlfriend! Great party!! `, 
        isRead: false, 
        sentAtToShow : new Date('May 23, 2020 10:20:00').toLocaleDateString(),
        sentAt: new Date('May 23, 2020 10:20:00').getTime(),
        isSent: false
      },
      {
        id: storageService._makeId(),
        name: 'Butters Stotch',
        email: 'coolbutters@southpark.com',
        subject: 'HELLP!!!', 
        body: `Helpp!! The president is hiding in my closet!!!! `, 
        isRead: false, 
        sentAtToShow : new Date('January 3, 2021 22:24:00').toLocaleDateString(),
        sentAt: new Date('January 3, 2021 22:24:00').getTime(),
        isSent: false
      },    
]