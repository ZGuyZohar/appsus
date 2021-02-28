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
    .then((notes) => {
      if(!notes || !notes.length){
        console.log('fromGNotes');
        storageService._save(NOTES_KEY, gNotes)
        return gNotes
      }
      return notes
    })
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

var gNotes = [
    {
        id: makeId(length = 8),
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: 'I think someone thought of me'
        }
    },
    {
        id: makeId(length = 8),
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://upload.wikimedia.org/wikipedia/en/0/06/ButtersStotch.png",
            txt: "Butters"
        },
    },
    {
        id: makeId(length = 8),
        type: "noteAudio",
        isPinned: false,
        info: {
            txt: 'The Beatles',
            audio: '../sounds/salamisound-6018270-french-wine-bottle-falls-on.mp3'
        }
    },
    {
        id: makeId(length = 8),
        type: "noteTodos",
        isPinned: false,
        info: {txt: ["Do this", " Do that", " Go to the gym"]}
    },
    {
        id: makeId(length = 8),
        type: "noteVideo",
        isPinned: false,
        info: {txt: "Chess Video", video: "https://www.dailymotion.com/video/x7r96w3"}
    },
    {
        id: makeId(length = 8),
        type: "noteTxt",
        isPinned: false,
        info: {txt: "Don't forget to talk to or"}
    },
    {
        id: makeId(length = 8),
        type: "noteTodos",
        isPinned: false,
        info: {txt: ["Go to the gym", " Go to a movie", " finish homework"]}
    },
];


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


