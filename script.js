// Initialize elements with error handling
let addNote, main;
try {
    addNote = document.querySelector("#addnote");
    main = document.querySelector("#main");
    if (!addNote || !main) {
        throw new Error("Required elements not found");
    }
} catch (error) {
    console.error("Initialization error:", error);
}

// Add click event with error handling
addNote.addEventListener("click", function() {
    try {
        add();
    } catch (error) {
        console.error("Error in add note:", error);
    }
});


const add = () => {
    console.log("Add note button clicked"); // Debug log
    if (!main) {
        console.error("Main container not found");
        return;
    }


    const note = document.createElement("div");
    note.classList.add("note");

    // use backticks :
    note.innerHTML = `
    <div class="tool">
        <i class="fa-solid fa-floppy-disk save"></i>
        <i class="fa-solid fa-trash delete"></i>
    </div>
    <textarea></textarea>
    `;
    const saveBtn = note.querySelector(".save");
    const deleteBtn = note.querySelector(".delete");

    //Delete :
    deleteBtn.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    //Save:
    saveBtn.addEventListener("click", () => {
        saveNotes();
    });

    // new note :
    main.appendChild(note);

    saveNotes(); // Save notes after adding new one
};

// Function to save notes to localStorage:
const saveNotes = () => {
    try {
        const notes = document.querySelectorAll(".note");
        
        const notesData = [];
        notes.forEach(note => {
            const textarea = document.querySelectorAll(".note textarea");
            const innerText = note.innerText || note.textContent; 
            if (textarea) {
                const textareaValue = textarea.value;
                notesData.push({ textareaValue, innerText });
            } else {
                // In case there's no textarea, just save the innerText
                notesData.push({ innerText });
            }
    });
        localStorage.setItem("notes", JSON.stringify(notesData));
    } catch (error) {
        console.error("Error saving notes:", error);
        alert("Failed to save notes. Please try again.");
    }
}


// Function to load notes from localStorage
const loadNotes = () => {
    const notesData = JSON.parse(localStorage.getItem("notes")) || [];
    notesData.forEach(noteText => {
        const notes = document.querySelectorAll(".note textarea");
        const lastNote = notes[notes.length - 1];
        lastNote.value = noteText;       
    });
}

// Load notes when page loads
loadNotes();
