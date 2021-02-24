import {storageService} from '../../services/async-storage-service.js'

const NOTES_KEY = 'notes'

export const keepService = {
  
    createNote,
    query
}

// function getById() {
//     return notes
// }

function query() {
    return storageService.query(NOTES_KEY)
    .then(notes=>  {
        console.log(notes)
        if (!notes.length){
            notes=notes 
          saveToStorage(NOTES_KEY, notes)
        }return notes
       })
    }

function createNote() {
    const note = {
        type: 'noteTxt',
        isPinned: true,
        info: {
            txt: ''
        }
    }
    query()
    .then(notes=> {
        notes.push(note)
    
    saveToStorage(NOTES_KEY, notes)})
    
}

var notes = [
    {
    type: "noteTxt",
    isPinned: true,
    info: {
    txt: "Fullstack Me Baby!"
    }
    },
    {
    type: "noteImg",
    info: {
    url: "http://some-img/me",
    title: "Me playing Mi"
    },
    style: {
    backgroundColor: "#00d"
    }
    },
    {
    type: "noteTodos",
    info: {
    label: "How was it:",
    todos: [
    { txt: "Do that", doneAt: null },
    { txt: "Do this", doneAt: 187111111 }
    ]
    }
    }
   ];


   function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}