
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const input = document.getElementById("noteInput");
const container = document.getElementById("notesContainer");

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    const text = input.value.trim();

    if (text === "") {
        Swal.fire("Error","Write something","error");
        return;
    }

    notes.push({
        id: Date.now(),
        text
    });

    input.value = "";
    saveNotes();
    renderNotes();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes();
}

function editNote(id) {
    const note = notes.find(n => n.id === id);

    Swal.fire({
        title: "Edit Note",
        input: "textarea",
        inputValue: note.text,
        showCancelButton: true
    }).then(res => {
        if (res.isConfirmed && res.value.trim() !== "") {
            note.text = res.value;
            saveNotes();
            renderNotes();
        }
    });
}

function renderNotes() {
    if (notes.length === 0) {
        container.innerHTML = "<p class='text-center'>No notes yet</p>";
        return;
    }

    let html = "";

    notes.forEach(n => {
        html += `
        <div class="note">
            <p>${n.text}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" onclick="editNote(${n.id})">✏</button>
                <button class="btn btn-danger btn-sm" onclick="deleteNote(${n.id})">🗑</button>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

renderNotes();