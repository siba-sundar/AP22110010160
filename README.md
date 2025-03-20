# Social Media Dashboard

A simple social media dashboard with microservices architecture, consisting of a backend API server and a React frontend.

## Project Structure

- `Q1_HTTP_Microservice/` - Backend API server
- `Q2_React_App/` - Frontend React application

## Setup & Running

### Backend Server (Q1_HTTP_Microservice)
```bash
cd Q1_HTTP_Microservice
npm install
npm start
```
Server will run on http://localhost:5000 with endpoints:
- `/users` - Get top users
- `/posts` - Get posts data

### Frontend Application (Q2_React_App)
```bash
cd Q2_React_App
npm install
npm run dev
```
Frontend will run on http://localhost:3000 featuring:
- Top Users page
- Trending Posts
- Feed page

## Ports
- Backend Server: http://localhost:5000
- Frontend App: http://localhost:3000

## Note
Make sure to start the backend server before running the frontend application.
