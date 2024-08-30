import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"
                    ></i>
                </button>
            </div>
        </div>
    ))
   function notesH1(){
    setTimeout(function(){
        location.reload();
        console.log("page refreshed because the user clicked the notes h1");
        
    }, 3000); //
   }
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
        <button className="noteH1" onClick={notesH1}><h3>Notes</h3></button>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
