# QuickNotes API Design

## 1. Overview

The QuickNotes API allows users to create, view, update, and delete notes.
It also supports tags for organizing notes.

The API uses REST principles and JSON for sending and receiving data.

**Base URL:** `/api/v1`

**Content-Type:** `application/json`

## 2. API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | /api/v1/notes | Retrieve the user's notes | 200 OK |
| POST | /api/v1/notes | Create a new note | 201 Created |
| GET | /api/v1/notes/{noteId} | Retrieve one note | 200 OK |
| PATCH | /api/v1/notes/{noteId} | Update a note | 200 OK |
| DELETE | /api/v1/notes/{noteId} | Delete a note | 204 No Content |
| GET | /api/v1/tags | Retrieve the user's tags | 200 OK |
| POST | /api/v1/tags | Create a new tag | 201 Created |

## 3. List Notes

**Request**

`GET /api/v1/notes`

Example response:

    {
      "data": [
        {
          "id": 101,
          "userId": 1,
          "title": "Study Plan",
          "body": "Revise system design",
          "createdAt": "2026-10-29T10:00:00Z",
          "updatedAt": "2026-10-29T10:00:00Z"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 1
      }
    }

## 4. Create a Note

**Request**

`POST /api/v1/notes`

Example request body:

    {
      "title": "Study Plan",
      "body": "Revise system design"
    }

Example successful response:

    {
      "data": {
        "id": 101,
        "userId": 1,
        "title": "Study Plan",
        "body": "Revise system design",
        "createdAt": "2026-10-29T10:00:00Z",
        "updatedAt": "2026-10-29T10:00:00Z"
      }
    }

**Status:** `201 Created`

The server generates the note ID and timestamps. The authenticated
user's ID is obtained from their session or access token.

## 5. Update a Note

**Request**

`PATCH /api/v1/notes/101`

Example request body:

    {
      "title": "Updated Study Plan"
    }

**Success status:** `200 OK`

Only the fields included in the request are updated.

## 6. Delete a Note

**Request**

`DELETE /api/v1/notes/101`

**Success status:** `204 No Content`

The server deletes the note if it belongs to the authenticated user.

## 7. Error Responses

The API uses standard HTTP status codes to communicate errors.

| Status | Meaning | Example |
|---|---|---|
| 400 | Bad Request | The title is missing |
| 401 | Unauthorized | The user is not logged in |
| 403 | Forbidden | The user is not allowed to perform the action |
| 404 | Not Found | The requested note does not exist |
| 500 | Internal Server Error | An unexpected server error occurred |

Example error response:

    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "The note title is required."
      }
    }

## 8. Validation and Security

- A note title is required.
- A note title cannot exceed 100 characters.
- The API validates incoming data before saving it.
- Authentication is required for private notes.
- Users can only access or modify their own notes.
- The server uses parameterized database queries to reduce SQL injection risks.
- User input is treated as text and is not executed as HTML.

## 9. Pagination

The notes endpoint supports pagination to avoid returning too much data
in one response.

Example:

`GET /api/v1/notes?page=1&limit=20`

The server returns up to 20 notes per page.

## 10. Design Decisions

- REST provides predictable resource URLs and HTTP methods.
- JSON makes requests and responses easy for web applications to process.
- Pagination improves performance when users have many notes.
- Authentication protects private notes.
- Appropriate HTTP status codes help the frontend understand whether
  requests succeeded or failed.