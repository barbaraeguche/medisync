# quantumcare 🩺
a comprehensive healthcare management platform designed to manage patient appointments and doctor schedules. the system
features appointment scheduling, secure authentication, prescription management, and role-based access for patients, 
doctors, administrators, and cron scheduling.

## tech stack ✨
- **frontend:** built with vite + react, tailwindcss, and redux for state management.
- **backend:** powered by spring boot and postgresql for database management.
- **deployment:** frontend hosted on vercel; backend deployed on render.

## features 👾
- **appointment booking system:** schedule and manage healthcare appointments with preferred doctors.
- **secure authentication and access control:** spring security with jwt-based roles, full authorization flow, and complete user account lifecycle.
- **centralized state management:** redux implementation for consistent application state.
- **appointment tracking:** detailed history of past and upcoming medical visits.
- **automated scheduling:** system triggers to free up appointments when doctor availability changes and mark past appointments as completed.
- **prescription management:** medication system with follow-up logic (50% chance for regular appointments, 100% for emergency cases).

## challenges faced 💢
- **complex form validation:** implementing zod validation for optional numerical inputs in appointment forms.
- **reusable component architecture:** creating the `EditableForm` components to prevent repetitive state management.
- **security configuration:** establishing proper spring security setup with jwt authentication.
- **environment configuration:** integrating `.env` file into `.yml` file with spring boot.
- **multi-role data access:** implementing appropriate permissions for admin, patient, and doctor roles.

## what I learned 💭
- **advanced form handling:** implementing react hook forms with comprehensive validation.
- **data table implementation:** integrating tanstack table with shadcn.
- **efficient data loading:** creating pagination systems for handling large datasets.
- **date handling techniques:** properly using `parseIso` from date-fns to avoid timezone issues.
- **global state architecture:** implementing redux for application-wide state management.
- **role-based authorization:** managing different user types with appropriate access controls.
- **api security implementation:** configuring spring boot security for protected endpoints.

## limitations 🚨
- **static medication database:** medications are pre-defined rather than dynamically sourced.
- **limited authentication options:** no support for third-party providers like github or google.
- **basic analytics capabilities:** minimal reporting tools for administrative oversight.
- **notification system constraints:** lack of real-time alerts for appointments and updates.
- **isolated ecosystem:** no integration with external healthcare information systems.

## improvements 🌱
- **ai-powered recommendations:** develop intelligent medication suggestions based on patient profiles.
- **communication platform:** add real-time messaging between patients and medical staff.
- **mobile application support:** create native mobile experiences for ios and android.
- **telehealth integration:** implement video consultation capabilities for remote appointments.
- **expanded analytics dashboard:** develop comprehensive reporting tools for administrators.
- **health record integration:** connect with external electronic health record systems.
- **appointment optimization:** implement intelligent scheduling based on doctor availability patterns.

## .env file & application.properties 📄
this project requires `.env` files for both the server and client, located in their respective folders. rename the 
`.env.example` (or `.env.properties.example`) file in each folder by removing the `.example` suffix, and update it with 
the necessary values. ensure these files are configured properly and not committed to version control.

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
   2. **build the project with maven wrapper:**
   ```bash
   ./mvnw clean compile install
   ```
   3. **run the spring boot application:**
   ```bash
   ./mvnw spring-boot:run
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
**erd diagram:**
![quantumcare](https://github.com/user-attachments/assets/fb58831e-8119-4b5c-8dc7-849fc4d97030)

**admin:**

https://github.com/user-attachments/assets/6d892c71-632d-4178-a24c-0f29ef2fad37

**doctor:**

https://github.com/user-attachments/assets/ba343ab8-980f-49dc-af28-3c59ac552649

**patient:**

https://github.com/user-attachments/assets/d73ac358-862a-42b8-becc-9f5730fd3eb6
