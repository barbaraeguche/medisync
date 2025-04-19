# quantum care 🩺 


## tech stack ✨
- **frontend:** built with vite + react, tailwindcss, and redux for state management.
- **backend:** powered by spring boot and postgresql for database management.
- **deployment:** frontend hosted on vercel; backend deployed on aws.

## features 👾
- **title:** description

## challenges faced 💢
- **title:** description
- getting zod to validate an optional number input

## what I learned 💭
- **title:** description
- react hook forms
- custom input wrapper to display label, input field and error
- tanstack table
- pagination
- availability form
- string back to date without getting previous date i.e., parseIso date-fns

## limitations 🚨
- **title:** description

## improvements 🌱
- **title:** description
- add reviews for each doctor
- AI prescribing medications based on user profile

## .env file & application.properties 📄


## running the project 🏁
to get the project up and running on your local machine, follow these steps:

- **ensure [node.js](https://nodejs.org/en) and [jdk](https://www.oracle.com/java/technologies/downloads/) are installed:** this project uses node v22 and jdk v23
1. **clone the repository:**
```bash
git clone https://github.com/barbaraeguche/quantumcare.git
```

2. **navigate to the project directory:**
```bash
cd quantumcare
```

3. **run the backend:**
   1. **navigate to server directory:**
   ```bash
   cd server
   ```
   2. **install and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source ./venv/bin/activate
   ```
   3. **run the flask app:**
   ```bash
   python3 app.py
   ```
   4. open [http://localhost:8080](http://localhost:8080) with your browser.

4. **run the frontend:**
   1. **navigate to client directory:**
   ```bash
   cd client
   ```
   2. **install dependencies:**
   ```bash
   pnpm install
   ```
   3. **start the development server:**
   ```bash
   vite dev
   # or
   pnpm run dev
   ```
   4. open [http://localhost:5173](http://localhost:5173/) with your browser to see the result.

## preview 📸