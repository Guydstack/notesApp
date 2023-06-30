// Catch some elementts from the Html 
const notesInput = document.querySelector("#notes_input")
const notesDate = document.querySelector("#notes_date")
const notesTime = document.querySelector("#notes_time")
const newUserNotes = document.querySelector(".all-notes")
const noteColor = document.querySelector("#chouse_color")

                            // Date and Time
// Get date and time
const today = new Date()
const todayDate = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`

// Pad minutes with leading zero if less than 10
const minutes = today.getMinutes().toString().padStart(2, '0'); 
const hours = today.getHours().toString().padStart(2, '0'); 
// Update the hours and minuts
const todayTime = `${hours}:${minutes}`
// take user input 
notesDate.value = todayDate
notesTime.value = todayTime

// Adding a leading zero if the month and day values only contain a single digit
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
    }
// Function that format the date to day/month/year
    function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
    }
                            
                            // Date and Time END
                            
// Save user data in the localstorage
const notes = JSON.parse(localStorage.getItem("notes")) || []


// Class with constructor
class Notes {
    // static id = 0
    constructor(notes, date, time, color){
        this.id = getRandomInt()
        this.notes = notes
        this.date = date
        this.time = time
        this.color = color
    }
}

// Creat a rendum number to be used for ID
function getRandomInt() {
    return Math.floor(Math.random() * 1000000);
  };
 

// Print an Html elemnts with user value
function showHtml(notesEl){
    newUserNotes.innerHTML += `
   
        <div id="new_notes_${notesEl.id}" class="note_${notesEl.color} notes-style"> 
           <div style="padding: 50px 50px 20px 50px;"> 
            <p class="text-style">${notesEl.notes}</p>
            <div>${formatDate(new Date(notesEl.date))}</div>
            <div>${notesEl.time}</div>
           </div> 
           <button onclick="removeNotes(${notesEl.id})" class="button_remove"><span class="material-symbols-outlined">
           delete
           </span></button>
        </div>

    `
}

// Get user Value and add it to Notes class 
function printNewNotes(e){
    e.preventDefault()
    const myNotes = new Notes(notesInput.value, notesDate.value, notesTime.value, noteColor.value)
    showHtml(myNotes)
    notes.push(myNotes)
    localStorage.setItem("notes",JSON.stringify(notes))
    notesInput.value = '';
    notesDate.value = todayDate;
    notesTime.value = todayTime;

}


// notes.forEach(showHtml);


// function removeNotes(id){
// let noteBackground = document.querySelector(`#new_notes_${id}`);
// let index = notes.indexOf(noteBackground);
// notes.splice(index)
// localStorage.setItem("notes",JSON.stringify(notes))
// // noteBackground.setAttribute('style', 'background-image:none !important');
// // noteBackground.innerHTML = "";
// // noteBackground.remove();
// removeFadeOut(noteBackground, 2000);
// }


// Remove notes
function removeNotes(id) {
    let noteBackground = document.querySelector(`#new_notes_${id}`);
    let index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      removeFadeOut(noteBackground, 2000);
    }
  }


// Remove all notes
function removeAllNotes() {
    localStorage.clear()
    // localStorage.removeItem("notes");
    const newUserNotes = document.querySelector(".all-notes")
    newUserNotes.innerHTML = "";
  }


// Loop that print the existing notes
notes.forEach(showHtml);


// Let user send value by pressing Enter on the keyboard
notesInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("button_creat").click();
      notesInput.value = '';
    } 
  });


// Effect Fadeout when user remove a note
  function removeFadeOut( el, speed) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

