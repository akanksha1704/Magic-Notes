console.log("Welcome to notes app");
showNotes();

// if use add a NodeIterator,add it to localsTORAGE
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    let myObj= {
      title:addTitle.value,
      text:addTxt.value
    }
    noteObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(noteObj);
    showNotes();
});

//Function to show elements from local storage!!
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
               <div class="noteCard my-2 mx-2" style="width: 18rem;">
                 <div class="card-body">
                    <h5 class="card-title">Note ${element.title}</h5>
                        <p class = "card-text">${element.text}</p>
                         <Button id= "${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Node</a>
                   </div>
                 </div>  `
    });
    let noteElm = document.getElementById("notes");
    if (noteObj.length != 0) {
        noteElm.innerHTML = html;


    }
    else {
        noteElm.innerHTML = `<b>Nothing to show! Use  "Add a note" section above to add notes!</b>`;
    }

}

// Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();

}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired!!",inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function(element){
        let cardTxt  = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if ( cardTxt.includes(inputVal)){
            element.style.display = "block";

        }
        else{
            element.style.display = "none";
        }
    })

})