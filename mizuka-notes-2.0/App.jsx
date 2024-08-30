import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import {
	onSnapshot,
	addDoc,
	doc,
	deleteDoc,
	setDoc,
	collection,
	query,
	orderBy,
	getDocs,
} 
from 'firebase/firestore';
import { notesCollection, db } from './firebase';
export default function App() {
	const [notes, setNotes] = React.useState([]);
	const [currentNoteId, setCurrentNoteId] = React.useState('');
	const [tempNoteText, setTempNoteText] = React.useState('');


	const currentNote =
	notes.find((note) => note.id === currentNoteId) || notes[0];
	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

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


	React.useEffect(() => {
		if (currentNote) {
			setTempNoteText(currentNote.body);
		}
	}, [currentNote]);


	React.useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id);
		}
	}, [notes]);
 /**
     * Create an effect that runs any time the tempNoteText changes
     * Delay the sending of the request to Firebase
     *  uses setTimeout
     * use clearTimeout to cancel the timeout
     */
	React.useEffect(() =>{
		const timeOut =setTimeout(() => { // timeOut is timeoutId too for understanding
			if(tempNoteText !== currentNote.body){
			updateNote(tempNoteText)}
		}, 500);
		return ()=> clearTimeout(timeOut)//500 means 500ms no need to put ms 
	},[tempNoteText])


	async function createNewNote() {
		const newNote = {
			body: "# Type your markdown note's title here",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		const newNoteRef = await addDoc(notesCollection, newNote);
		setCurrentNoteId(newNoteRef.id);
	}

	async function updateNote(text) {
		const docRef = doc(db, 'notes', currentNoteId);
		await setDoc(
			docRef,
			{ body: text, updatedAt: Date.now() },
			{ merger: true }
		);
	}

	async function deleteNote(noteId) {
		const docRef = doc(db, 'notes', noteId);
		await deleteDoc(docRef);
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction='horizontal' className='split'>
					<Sidebar
						notes={sortedNotes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					<Editor
						tempNoteText={tempNoteText}
						setTempNoteText={setTempNoteText}
					/>
				</Split>
			) : (
				<div className='no-notes'>
					<h1 className='noNote'>You Have No Notes</h1>
					<button className='first-note' onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
