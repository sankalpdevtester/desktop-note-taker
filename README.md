# Simple Desktop Note Taker App
A simple desktop note taking application for individuals to organize their thoughts and ideas.

## Badges
[![Language](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

## What it does
This application allows users to create, edit, delete, search, and categorize notes, providing a simple and intuitive way to manage their thoughts and ideas. The application is built using Create React App, Electron, and TypeScript, ensuring a robust and efficient user experience. With its user-friendly interface, users can easily organize their notes and stay productive.

## Features
* Note creation: create new notes with a title and content
* Note editing: edit existing notes to update their title or content
* Note deletion: delete notes that are no longer needed
* Note searching: search for notes by title or content
* Note categorization: categorize notes by tags or folders

## Requirements
* Node.js: 16.14.2
* npm: 8.5.5
* Electron: 19.0.4
* Create React App: 5.0.1
* TypeScript: 4.6.4

## Installation
To install the application, run the following command:
```bash
npm install
```
This command will install all the required dependencies.

## Usage
To run the application, use the following command:
```bash
npm run electron:serve
```
This command will start the Electron development server, and the application will be available at http://localhost:1212. You can create a new note by clicking the "New Note" button, edit an existing note by clicking on its title, delete a note by clicking the "Delete" button, search for notes by typing in the search bar, and categorize notes by adding tags or folders.

## Environment Variables
| Variable | Description |
| --- | --- |
| `ELECTRON_ENV` | The environment in which the Electron application is running (e.g., development, production) |
| `REACT_APP_NOTE_STORAGE` | The location where notes are stored (e.g., local storage, file system) |
| `REACT_APP_SEARCH_LIMIT` | The maximum number of search results to display |

## Project Structure
```markdown
simple-desktop-note-taker-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Note.tsx
│   │   ├── NoteList.tsx
│   │   ├── SearchBar.tsx
│   │   └── Tag.tsx
│   ├── containers/
│   │   ├── App.tsx
│   │   └── NoteEditor.tsx
│   ├── models/
│   │   ├── Note.ts
│   │   └── Tag.ts
│   ├── services/
│   │   ├── NoteService.ts
│   │   └── StorageService.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── index.tsx
│   ├── main.ts
│   └── setupTests.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing
Contributions are welcome! To contribute to this project, please fork the repository, make your changes, and submit a pull request. Please ensure that your changes are consistent with the existing code style and that you have included any necessary tests.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.