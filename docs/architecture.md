# QuickNotes System Architecture

## 1. Overview

QuickNotes is a web application that allows users to create, read, update,
delete, and organize notes.

The system is designed to support up to one million registered users.
It uses multiple application servers, caching, database replication,
and background workers to improve reliability and performance.

## 2. Functional Requirements

The system must allow users to:

1. Register and log in.
2. Create notes.
3. View their notes.
4. Update existing notes.
5. Delete notes.
6. Organize notes using tags.
7. Access only their own private notes.

## 3. Non-Functional Requirements

### Performance

Common requests should respond quickly under normal operating conditions.

### Scalability

The system should support growth in users and requests by adding
application servers and increasing database capacity when necessary.

### Availability

The system should continue operating when an individual application
server fails.

### Security

The system must authenticate users, authorize access to notes, validate
input, and protect sensitive information.

### Data Integrity

The database must maintain valid relationships between users, notes,
and tags.

## 4. Architecture Diagram

```text
                         USERS
                           |
                           v
                        [ DNS ]
                           |
                           v
                         [ CDN ]
                           |
                           v
                    [ Load Balancer ]
                      /           \
                     v             v
              [ App Server 1 ] [ App Server 2 ]
                      |             |
                      +------+------+
                             |
                 +-----------+-----------+
                 |           |           |
                 v           v           v
              [ Cache ] [ Primary DB ] [ Message Queue ]
                            |                  |
                            v                  v
                       [ Read Replica ]    [ Worker ]