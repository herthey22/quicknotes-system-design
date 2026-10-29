# QuickNotes Data Model

## 1. Overview

QuickNotes uses a relational database such as PostgreSQL to store users,
notes, and tags.

The database contains four tables:

1. users
2. notes
3. tags
4. note_tags

## 2. Database Tables

### Users Table

Stores information about registered users.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | BIGINT | Primary Key | Unique user ID |
| name | VARCHAR(100) | | User's name |
| email | VARCHAR(255) | Unique | User's email address |
| password_hash | VARCHAR(255) | | Secure password hash |
| created_at | TIMESTAMPTZ | | Account creation time |

### Notes Table

Stores notes created by users.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | BIGINT | Primary Key | Unique note ID |
| user_id | BIGINT | Foreign Key | Owner of the note |
| title | VARCHAR(100) | | Note title |
| body | TEXT | | Note content |
| created_at | TIMESTAMPTZ | | Creation time |
| updated_at | TIMESTAMPTZ | | Last update time |

### Tags Table

Stores tags that users can use to organize notes.

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | BIGINT | Primary Key | Unique tag ID |
| user_id | BIGINT | Foreign Key | Owner of the tag |
| name | VARCHAR(50) | | Tag name |

A tag name must be unique for each user.

### Note_Tags Table

Connects notes to tags.

| Column | Data Type | Key | Description |
|---|---|---|---|
| note_id | BIGINT | Primary Key, Foreign Key | Connected note |
| tag_id | BIGINT | Primary Key, Foreign Key | Connected tag |

The combination of note_id and tag_id forms a composite primary key.

## 3. Relationships

### One-to-Many: Users and Notes

One user can create many notes, but each note belongs to one user.

Relationship:

users.id -> notes.user_id

### One-to-Many: Users and Tags

One user can create many tags, but each tag belongs to one user.

Relationship:

users.id -> tags.user_id

### Many-to-Many: Notes and Tags

A note can have multiple tags, and a tag can be used on multiple notes.

The note_tags table connects the two tables.

Relationships:

notes.id -> note_tags.note_id

tags.id -> note_tags.tag_id

## 4. SQL Table Creation

The following SQL creates the four tables.

### Users

    CREATE TABLE users (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

### Notes

    CREATE TABLE notes (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        body TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

### Tags

    CREATE TABLE tags (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        UNIQUE (user_id, name)
    );

### Note_Tags

    CREATE TABLE note_tags (
        note_id BIGINT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
        tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (note_id, tag_id)
    );

## 5. Example SQL Queries

### Query 1: Retrieve a User's Notes

    SELECT id, title, body, created_at
    FROM notes
    WHERE user_id = 1
    ORDER BY updated_at DESC;

This retrieves notes belonging to user 1, with recently updated notes first.

### Query 2: Retrieve One Note

    SELECT id, title, body
    FROM notes
    WHERE id = 10 AND user_id = 1;

This retrieves a specific note belonging to user 1.

### Query 3: Retrieve Notes with Their Tags

    SELECT
        notes.id,
        notes.title,
        tags.name AS tag_name
    FROM notes
    JOIN note_tags ON notes.id = note_tags.note_id
    JOIN tags ON note_tags.tag_id = tags.id
    WHERE notes.user_id = 1
    ORDER BY notes.id;

This uses JOIN operations to retrieve notes together with their tags.

### Query 4: Count a User's Notes

    SELECT COUNT(*) AS total_notes
    FROM notes
    WHERE user_id = 1;

This counts the number of notes owned by user 1.

## 6. Indexing

Create an index on user_id and updated_at:

    CREATE INDEX idx_notes_user_updated
    ON notes(user_id, updated_at DESC);

This index helps the application find a user's notes and sort them
by the most recently updated notes.

The email column already has a unique constraint, which creates a
unique index in PostgreSQL.

## 7. SQL vs NoSQL

SQL databases, such as PostgreSQL, store structured data in tables and
support relationships using primary keys and foreign keys.

NoSQL databases, such as MongoDB, can store flexible document structures.
They can be useful when data structures change frequently or when a
document-based approach fits the application.

For QuickNotes, PostgreSQL is a suitable choice because users, notes,
and tags have clear relationships. SQL constraints also help maintain
data consistency and protect relationships between records.