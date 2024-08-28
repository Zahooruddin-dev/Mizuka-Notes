import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { nanoid } from 'nanoid';

export default function App() {
	const [notes, setNotes] = React.useState(() => {
		const savedNotes = localStorage.getItem('notes');
		try {
			return savedNotes ? JSON.parse(savedNotes) : [];
		} catch (error) {
			console.error('Error parsing JSON from localStorage:', error);
			return [];
		}
	});

	const [currentNoteId, setCurrentNoteId] = React.useState(
		(notes[0] && notes[0].id) || ''
	);
	/*
     function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId;
        }) || notes[0];
    }
     const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]
        can't use at the moment but will update it soon
    */
        function findCurrentNote() {
            return notes.find(note => {
                return note.id === currentNoteId
            }) || notes[0]
        }

	React.useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "# Type your markdown note's title here",
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

    function updateNote(text) {
        // puttint the most recently modified notes up at the top

        setNotes(oldNotes => {
            const newArray = []
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }
       /**
     * Challenge: complete and implement the deleteNote function
     * 
     * Hints: 
     * 1. What array method can be used to return a new
     *    array that has filtered out an item based 
     *    on a condition?
     * 2. Notice the parameters being based to the function
     *    and think about how both of those parameters
     *    can be passed in during the onClick event handler
     * function deleteNote(event, noteId) {
    event.stopPropagation();

    setNotes(prevNotes => 
        prevNotes.filter(note => note.id !== noteId)
    );
}

     */
    function deleteNote(event, noteId) {
        event.stopPropagation()
        console.log("Deleting note with ID:", noteId);
        setNotes(prevNotes => 
            prevNotes.filter(note => note.id !== noteId)
        );
    }
	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction='horizontal' className='split'>
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
                        deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className='no-notes'>
					<h1>You have no notes</h1>
					<button className='first-note' onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
