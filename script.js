const notesInput = document.querySelector("#notes_input")
const notesDate = document.querySelector("#notes_date")
const notesTime = document.querySelector("#notes_time")
const newUserNotes = document.querySelector(".all-notes")


class Notes {
    static id = 0
    constructor(notes, date, time){
        this.id = ++Notes.id
        this.notes = notes
        this.date = date
        this.time = time
    }

    showHtml(){
        newUserNotes.innerHTML += `
       
            <div style="background-image:url(img/note.png); background-repeat: no-repeat;"> 
               <div style=" padding: 50px;"> 
                <p>${this.notes}</p>
                <p>${this.date}</p>
                <p>${this.time}</p>
               </div> 
            </div>
    
        `
    }

}



function printNewNotes(e){
    e.preventDefault()
    const myNotes = new Notes(notesInput.value, notesDate.value, notesTime.value)
    // document.querySelector(".clear_inputs").reset();
    myNotes.showHtml()
}





// function removeMovie(id){
// document.querySelector(`tr.remove-this-movie-${id}`).innerHTML = "";
// }


// function keyboardPressed(e) {
//     if (e.code == "Enter") {
//         addMovie()
//     }
// }