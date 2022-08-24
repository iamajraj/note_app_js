const popupOverlay = document.querySelector(".popup-overlay"),
    addNotebtn = document.querySelector(".add-note-btn"),
    closeMenu = document.querySelector(".close-menu"),
    noteForm = document.querySelector("#note-form"),
    titleInp = document.querySelector("#title"),
    descInp = document.querySelector("#desc"),
    notesContainer = document.querySelector(".notes");

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

addNotebtn.addEventListener("click", () => {
    popupOverlay.classList.add("show");
});

closeMenu.addEventListener("click", () => {
    popupOverlay.classList.remove("show");
});

let notes = [];
showNotes();

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleText = titleInp.value;
    const descText = descInp.value;
    if (titleText.trim() && descText.trim()) {
        let noteObj;
        const dateObj = new Date();
        const date = `${dateObj.getDate()} ${
            monthNames[dateObj.getMonth()]
        } ${dateObj.getFullYear()}`;
        noteObj = {
            title: titleText,
            desc: descText,
            date,
        };
        notes.push(noteObj);
        setNotes();
        showNotes();
        titleInp.value = "";
        descInp.value = "";
        closeMenu.click();
    }
});

function setNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes() {
    notesContainer.innerHTML = "";
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    let eleList = [];
    notes.forEach((note, index) => {
        let noteEle = `<li class="note">
                     <h1>${note.title}</h1>
                     <p>${note.desc}</p>
                    <div class="options_date">
                    <img
                        src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png"
                        alt="delete"
                        class="delete"
                        onclick="deleteNote(${index})"
                        />
                    <span>${note.date}</span>
                    </div>
                </li>`;
        eleList.push(noteEle);
    });
    eleList.reverse().forEach((liEle) => {
        notesContainer.insertAdjacentHTML("beforeend", liEle);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    setNotes();
    showNotes();
}
