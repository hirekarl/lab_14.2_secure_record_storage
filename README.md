# Lab 14.2: Secure Record Storage

[Karl Johnson](https://github.com/hirekarl)  
2025-RTT-30  
<time datetime="2025-08-28">2025-08-28</time>  

## Overview
### Viewer Instructions
1. In the terminal, run:

```bash
cd notes-api && npm i && npm run dev
```

2. Run API requests against http://localhost:3001/api/users and http://localhost:3001/api/notes.

### Submission Source
Top-level application behavior can be found in [`./notes-api/server.js`](./notes-api/server.js).

## Assignment
You have been given a pre-existing “Notes” API. It has full CRUD (Create, Read, Update, Delete) functionality and is protected by authentication middleware, meaning only logged-in users can access the endpoints. However, there’s a significant flaw: **any authenticated user can view, update, or delete *any* note**, regardless of who created it.

Your task is to implement authorization logic to ensure that users can only access and manage the notes they personally own.
