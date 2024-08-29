import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import { onSnapshot, addDoc } from 'firebase/firestore';
import { notesCollection } from './firebase';
export default function App() {
	const [notes, setNotes] = React.useState([]);

	const [currentNoteId, setCurrentNoteId] = React.useState(
		(notes[0] && notes[0].id) || ''
	);
	React.useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
			// Sync up our local notes array with the snapshot data
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setNotes(notesArr);
		});
		return unsubscribe;
	}, []);

	async function createNewNote() {
		console.log('worked createNewNote');
		const newNote = {
			body: "# Type your markdown note's title here",
		};
		const newNoteRef = await addDoc(notesCollection, newNote);
		setCurrentNoteId(newNoteRef.id);
	}
	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	function updateNote(text) {
		// puttint the most recently modified notes up at the top and not the update that you would think

		setNotes((oldNotes) => {
			const newArray = [];
			for (let i = 0; i < oldNotes.length; i++) {
				const oldNote = oldNotes[i];
				if (oldNote.id === currentNoteId) {
					newArray.unshift({ ...oldNote, body: text });
				} else {
					newArray.push(oldNote);
				}
			}
			return newArray;
		});
	}
	function deleteNote(event, noteId) {
		event.stopPropagation();
		console.log('Deleting note with ID:', noteId);
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
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
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
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
