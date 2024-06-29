document.addEventListener('DOMContentLoaded', () => 
{
    const notesContainer = document.getElementById('notesContainer');
    const addNoteButton = document.getElementById('addNoteButton');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const displayNotes = () => 
    {
        notesContainer.textContent = '';
        const sortedNotes = notes.sort((a, b) => b.pin - a.pin || new Date(b.date) - new Date(a.date));
        sortedNotes.forEach(note => 
        {
            const noteElement = document.createElement('div');
            noteElement.className = 'note' + (note.pin ? 'pinned' : '');
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = 
                `<h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>${new Date(note.date).toLocaleString()}</small>
                <button onclick="deleteNote('${note.id}')">Usuń</button>`;

            notesContainer.appendChild(noteElement);
        });
    };

    const addNote = () => 
    {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const color = document.getElementById('color').value;
        const pin = document.getElementById('pin').checked;
        const date = new Date().toISOString();
        const id = Date.now().toString();

        const note = { id, title, content, color, pin, date };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();

        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('color').value = '#ffffff';
        document.getElementById('pin').checked = false;
    };

    window.deleteNote = (id) => 
    {
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };

    addNoteButton.addEventListener('click', addNote);

    displayNotes();
});