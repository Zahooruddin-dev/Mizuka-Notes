React Notes App
This is a Markdown-based note-taking application built with React, Firebase, and ReactMde. The app allows users to create, edit, and delete notes, with changes automatically synced to a Firebase Firestore database. The notes are displayed in a sidebar, sorted by the most recently updated, and users can view and edit the notes in a markdown editor.

Features:
Real-time Sync with Firebase Firestore: Notes are stored and retrieved in real-time from Firebase, ensuring that your data is always up-to-date.
Markdown Support: Notes are written in Markdown, with a live preview available using the ReactMde and Showdown libraries.
Auto-Save Functionality: The app features an auto-save mechanism that updates notes in Firebase with a 500ms debounce, ensuring minimal disruption while typing.
Responsive UI with Split Pane: The user interface is divided into a sidebar for note selection and an editor pane, allowing for a clean and organized workflow.
Create, Edit, and Delete Notes: Easily manage your notes with options to create new notes, edit existing ones, and delete notes you no longer need.
Firebase Integration: Leveraging Firebase's Firestore for backend data storage and synchronization, and Firebase's SDK for easy integration.
Technologies Used:
React: Frontend library for building the user interface.
Firebase Firestore: NoSQL database for real-time data syncing.
ReactMde: Markdown editor with live preview functionality.
Showdown: Markdown to HTML converter.
React-Split: For creating a resizable split pane layout.
How to Run:
Clone the repository.
Install dependencies using npm install.
Configure your Firebase project in the firebaseConfig object.
Run the app locally using npm start.
