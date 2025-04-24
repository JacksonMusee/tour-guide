# TOur GUide Q&A Application

A modern web application that guides users on local sites the can tour using DeepSeek's LLM. Built with Next.js (frontend) and FastAPI (backend).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- DeepSeek API key (free tier)

### Backend Setup
1. Navigate to `backend/`
2. Create a virtual environment:

   python -m venv venv
   source venv/bin/activate  # If on Windows: venv\Scripts\activate

3. Install dependencies
    pip install -r requirements.txt

4. Copy .env.example to /backend/.env and add your DeepSeek API key:
    DEEPSEEK_API_KEY=your_deepseek_api_key_here

5. Run the backeed
    uvicorn app.main:app --reload


### Frontend Setup
1. Navigate to frontend/

2. Install dependencies
    npm install

3. Run the frontend
    npm run dev

### Access application
    Frontend: http://localhost:3000
    Backend API: http://localhost:8000
    API Documentation: http://localhost:8000/docs