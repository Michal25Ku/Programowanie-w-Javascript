document.addEventListener('DOMContentLoaded', () => 
{
    const notesContainer = document.getElementById('notesContainer')
    const addNoteButton = document.getElementById('addNoteButton')
    const searchInput = document.getElementById('search')

    let notes = JSON.parse(localStorage.getItem('notes')) || []

    const displayNotes = (filteredNotes = notes) => 
    {
        notesContainer.textContent = ''
        const sortedNotes = filteredNotes.sort((a, b) => b.pin - a.pin || new Date(b.date) - new Date(a.date))
        sortedNotes.forEach(note => 
        {
            const noteElement = document.createElement('div')
            noteElement.className = 'note' + (note.pin ? 'pinned' : '')
            noteElement.style.backgroundColor = note.color
            noteElement.innerHTML = 
                `<h2>${note.title}</h2>
                <p>${note.content}</p>
                <small>${new Date(note.date).toLocaleString()}</small>
                <p><strong>Tagi:</strong> ${note.tags.join(', ')}</p>
                <button onclick="deleteNote('${note.id}')">Usuń</button>`

            notesContainer.appendChild(noteElement)
        });
    };

    const addNote = () => 
    {
        const title = document.getElementById('title').value
        const content = document.getElementById('content').value
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim())
        const color = document.getElementById('color').value
        const pin = document.getElementById('pin').checked
        const date = new Date().toISOString()
        const id = Date.now().toString()

        const note = { id, title, content, color, pin, date, tags }
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes))
        displayNotes()

        document.getElementById('title').value = ''
        document.getElementById('content').value = ''
        document.getElementById('tags').value = ''
        document.getElementById('color').value = '#ffffff'
        document.getElementById('pin').checked = false
    };

    window.deleteNote = (id) => 
    {
        notes = notes.filter(note => note.id !== id)
        localStorage.setItem('notes', JSON.stringify(notes))
        displayNotes();
    };

    const deleteAllNotes = () => 
    {
        notes = []
        localStorage.removeItem('notes')
        displayNotes()
    }

    const searchNotes = () => 
    {
        const searchText = searchInput.value.toLowerCase()
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchText) || 
            note.content.toLowerCase().includes(searchText) || 
            note.tags.some(tag => tag.toLowerCase().includes(searchText)) || 
            (note.pin && searchText === 'przypięta')
        );
        displayNotes(filteredNotes);
    };

    searchInput.addEventListener('input', searchNotes)
    deleteAllButton.addEventListener('click', deleteAllNotes)
    addNoteButton.addEventListener('click', addNote)

    displayNotes()
})