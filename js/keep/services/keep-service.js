import {storageService} from '../../services/async-storage-service.js'

const NOTES_KEY = 'notes'

export const keepService = {
    remove,
    createNote,
    query,
    makeId,
    getById,
    getIdxById,
    updateNote,
    save,
    getEmptyNote
}


function query() {
    return storageService.query(NOTES_KEY)
    }

function createNote() {
    const note = {
        id: makeId(length = 8),
        type: 'noteTxt',
        isPinned: true,
            txt: ''     
    }
    query()
    .then(notes=> {
        notes.push(note)
    
    saveToStorage(NOTES_KEY, notes)})
    return note
}

function getEmptyNote() {
    return { id: makeId(8), type: '', isPinned:true ,txt: '',url:''  }

}

function save(note) {
    return storageService.post(NOTES_KEY,note )
}

function updateNote(note){
  return storageService.put(NOTES_KEY, note)
}


function getById(id) {
    return storageService.get(NOTES_KEY, id)
}

function getIdxById(id){
    return query()
    .then(notes => notes.findIndex(note => note.id === id))
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

// var notes = [
//     {
//         id: makeId(length = 8),
//     type: "noteTxt",
//     isPinned: true,
//     info: {
//     txt: "Fullstack Me Baby!"
//     }
//     },
//     {
//         id: makeId(length = 8),
//     type: "noteImg",
    // info: {
    // url: "http://some-img/me",
    // title: "Me playing Mi"
//     },
//     style: {
//     backgroundColor: "#00d"
//     }
//     },
//     {
//         id: makeId(length = 8),
//     type: "noteTodos",
//     info: {
//     label: "How was it:",
//     todos: [
//     { txt: "Do that", doneAt: null },
//     { txt: "Do this", doneAt: 187111111 }
//     ]
//     }
//     }
//    ];


   function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


