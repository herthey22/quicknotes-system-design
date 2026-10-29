# QuickNotes System Design

## Project Overview

QuickNotes is a simple notes application project created to practice frontend API integration, REST API design, database modeling, and system architecture.

The application allows users to load notes, create new notes, and delete notes through an interactive web interface.

The project uses HTML, CSS, and JavaScript for the frontend. JSONPlaceholder is used as a practice API, while the documentation describes a proposed backend for a real QuickNotes application.

## Features

- Load notes from an API.
- Create notes using a form.
- Delete notes.
- Validate note titles.
- Display loading, success, and error messages.
- Handle HTTP requests using async/await and fetch.
- Display note content safely using `textContent`.
- Document REST API endpoints, database design, and system architecture.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- JSONPlaceholder
- Markdown
- Git and GitHub

## How to Run the Project

1. Clone this repository or download the project files.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the VS Code Live Server extension, or open it in a modern web browser.
4. Click **Load notes** to retrieve sample notes.
5. Use the form to create a note.
6. Use the Delete button to remove a note from the displayed list.

An internet connection is required to access JSONPlaceholder.

### Important Note

JSONPlaceholder is a testing API. Creating or deleting notes does not permanently change the server's stored data. Changes displayed by the application are for demonstration purposes.

## Project Documentation

- [API Design](docs/api-design.md) — REST endpoints, request and response examples, and error handling.
- [Data Model](docs/data-model.md) — database tables, relationships, SQL queries, and indexing.
- [System Architecture](docs/architecture.md) — architecture diagram, request flows, load estimates, scalability, and reliability.

## What I Learned

1. How to use JavaScript's Fetch API and async/await to communicate with an API.
2. How HTTP methods and status codes support operations such as GET, POST, and DELETE.
3. How to design REST API endpoints and document request and response formats.
4. How primary keys, foreign keys, and JOIN queries organize relational data.
5. How caching, load balancing, database replicas, and background workers support scalable systems.
6. How to organize project files and document a software project using Markdown.

## Future Improvements

- Add user registration and authentication.
- Connect the application to a persistent database.
- Implement note editing and tag management.
- Add pagination and search.
- Deploy the application and backend to a hosting platform.

## Author

Created as a learning project in frontend development and system design.