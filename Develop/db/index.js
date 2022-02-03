const util = require('util');
const uuid = require('uuid');
const fs = require('fs');

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);


class Notes {
    read() {
        return readAsync('db/db.json', 'utf-8');
    }

    write(data) {
        return writeAsync('db/db.json', JSON.stringify(data));
    }

    readNote() {
        return this.read().then((notes) => {
            let getNotes;

            try {
                getNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                getNotes = []
            }
            return getNotes;
        })
    }

    writeNotes(data) {
        const { title, text } = data;

        const newNote = {
            title,
            text,
            id: uuid.v4()
        }

        return this.readNote().then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes))
    }

    deleteNote(id) {
        return this.readNote().then((notes) => notes.filter(note => note.id !== id)).then((updatedNotes) => this.write(updatedNotes))
    }

}

module.exports = new Notes();