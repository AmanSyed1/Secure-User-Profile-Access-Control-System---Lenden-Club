
# SecureID: Secure Identity Management Microservice

A professional-grade identity management system built with security-first principles. This project demonstrates end-to-end encryption, stateless authentication, and modern full-stack development.

## 1. Project Overview
SecureID is a microservice designed to handle sensitive user information (like Government IDs) with robust encryption protocols. It uses a Flask-based backend for processing and a React-based frontend for user interaction.

## Application Screenshots
### Sign In Page
![Login and Balance Screen]()

## 2. Tech Stack
- **Backend:** Python 3.10+, Flask, SQLAlchemy ORM
- **Frontend:** React 18, Tailwind CSS, TypeScript
- **Database:** MySQL (MariaDB compatible)
- **Security:** AES-256 (Cryptography.fernet), BCrypt (Password hashing), JWT (Stateless Auth)
- **Testing:** PyTest

## 3. Setup & Run Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL Server

### Backend Setup
1. Navigate to the `/backend` directory.
2. Create a virtual environment: `python -m venv venv`.
3. Activate venv: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows).
4. Install dependencies: `pip install flask flask-sqlalchemy flask-bcrypt PyJWT cryptography mysql-connector-python pytest`.
5. Configure `.env` based on `.env.example`.
6. Run the app: `python app.py`.

### Frontend Setup
1. Navigate to the project root.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## 4. API Documentation
- `POST /api/register`: Register a new user. Encrypts Government ID and hashes password.
- `POST /api/login`: Authenticate user and receive a JWT.
- `GET /api/profile`: Retrieve user profile. Requires JWT. Decrypts Government ID on-the-fly.

## 5. Database Schema
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Unique User Identifier |
| name | VARCHAR(100) | User's full name |
| email | VARCHAR(120) | Unique email address |
| password_hash | VARCHAR(255) | BCrypt hashed password |
| encrypted_gov_id | BLOB | AES-256 encrypted Government ID |
| created_at | TIMESTAMP | Record creation date |

## 6. AI Tool Usage Log
- **AI-Assisted Tasks:**
    - Generated Flask auth boilerplate and SQLAlchemy models.
    - Created AES-256 encryption utilities for sensitive fields.
    - Implemented JWT validation middleware for route protection.
    - Generated comprehensive PyTest unit tests for security modules.
    - Built responsive React components using Tailwind CSS.
- **Effectiveness Score:** 5/5
- **Justification:** The AI successfully integrated complex security requirements across both backend and frontend, ensuring consistent implementation of encryption and authentication protocols while maintaining high code quality and documentation standards.
