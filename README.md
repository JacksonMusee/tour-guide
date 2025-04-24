# Tour Guide Q/A Application

A modern web application that uses DeepSeek's LLM to help users discover destinations and answer travel-related queries.  
Built with Next.js (frontend) and FastAPI (backend).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- DeepSeek API key

### Backend Setup
1. Navigate to `backend/`

```bash
    cd backend
```

2. Create and activate virtual environment:

```bash
   python -m venv venv
   source venv/bin/activate  # If on Windows: venv\Scripts\activate
```
3. Install dependencies

```bash
    pip install -r requirements.txt
```

4. Setup .env  
 Copy .env.example to backend/.env  
 Set your DeepSeek API key  

5. Run the backeed

```bash
    uvicorn app.main:app --reload
```

### Frontend Setup
1. Navigate to frontend/

```bash
    cd frontend/
```

2. Install dependencies

```bash
    npm install
```

3. Run the frontend

```bash
    npm run dev
```
### Access application
    Frontend: http://localhost:3000
    Backend API: http://localhost:8000
    API Documentation: http://localhost:8000/docs