// QuickNotes API Client
// Practice API: JSONPlaceholder

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadButton = document.getElementById("load-btn");
const statusMessage = document.getElementById("status");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitButton = document.getElementById("submit-btn");
const notesList = document.getElementById("notes-list");

let notes = [];

// Reusable function for sending HTTP requests.
async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // DELETE responses may have no JSON body.
    if (response.status === 204) {
        return { data: null, status: response.status };
    }

    const data = await response.json();

    return {
        data,
        status: response.status
    };
}

// Display status messages safely.
function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

// Create HTML elements without inserting user text as HTML.
function createNoteElement(note) {
    const item = document.createElement("li");
    item.className = "note-card";

    const title = document.createElement("h3");
    title.textContent = note.title || "Untitled note";

    const body = document.createElement("p");
    body.textContent = note.body || "No note body provided.";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteNote(note.id, item, deleteButton);
    });

    item.append(title, body, deleteButton);

    return item;
}

// Display notes or an empty state.
function renderNotes() {
    notesList.replaceChildren();

    if (notes.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent =
            "No notes yet. Load notes from the server or create your first note.";
        notesList.appendChild(emptyMessage);
        return;
    }

    notes.forEach((note) => {
        notesList.appendChild(createNoteElement(note));
    });
}

// GET: Load the first 10 notes.
async function loadNotes() {
    loadButton.disabled = true;
    showStatus("Loading notes...");

    try {
        const result = await request(`${API_URL}?_limit=10`);

        notes = result.data;
        renderNotes();

        if (notes.length === 0) {
            showStatus("No notes were found.", "success");
        } else {
            showStatus(`Loaded ${notes.length} notes from the server.`, "success");
        }
    } catch (error) {
        showStatus(
            "Sorry, we couldn't load your notes. Please try again.",
            "error"
        );
        console.error("Load notes error:", error);
    } finally {
        loadButton.disabled = false;
    }
}

// POST: Create a note.
async function createNote(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title) {
        showStatus("Please enter a title for your note.", "error");
        titleInput.focus();
        return;
    }

    if (title.length > 100) {
        showStatus("Your title must be 100 characters or fewer.", "error");
        titleInput.focus();
        return;
    }

    submitButton.disabled = true;
    showStatus("Creating your note...");

    try {
        const result = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        });

        const newNote = result.data;

        // JSONPlaceholder simulates creation; it does not permanently
        // save this note. Keep it in our local UI state for this session.
        notes.unshift(newNote);
        renderNotes();

        showStatus(
            `Note created (status ${result.status}, id ${newNote.id}).`,
            "success"
        );

        noteForm.reset();
    } catch (error) {
        showStatus(
            "Sorry, we couldn't create your note. Please try again.",
            "error"
        );
        console.error("Create note error:", error);
    } finally {
        submitButton.disabled = false;
    }
}

// DELETE: Remove a note.
async function deleteNote(noteId, item, button) {
    button.disabled = true;
    showStatus("Deleting note...");

    try {
        const result = await request(`${API_URL}/${noteId}`, {
            method: "DELETE"
        });

        // JSONPlaceholder does not permanently delete server data.
        // Remove the note from our local list to simulate the UI update.
        notes = notes.filter((note) => note.id !== noteId);
        renderNotes();

        showStatus(
            `Note removed from this page (status ${result.status}).`,
            "success"
        );
    } catch (error) {
        button.disabled = false;

        showStatus(
            "Sorry, we couldn't delete that note. Please try again.",
            "error"
        );

        console.error("Delete note error:", error);
    }
}

// Connect the buttons and form to their functions.
loadButton.addEventListener("click", loadNotes);
noteForm.addEventListener("submit", createNote);

// Show the empty state when the page first opens.
renderNotes();