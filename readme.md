# quantumcare 🩺
a comprehensive healthcare management platform designed to streamline the interaction between patients and healthcare 
providers. the system features appointment scheduling, secure authentication, prescription management, and role-based 
access for patients, doctors, and administrators.

## tech stack ✨
- **frontend:** built with vite + react, tailwindcss, and redux for state management.
- **backend:** powered by spring boot and postgresql for database management.
- **deployment:** frontend hosted on vercel; backend deployed on aws.

## features 👾
- **appointment booking system:** schedule and manage healthcare appointments with preferred doctors.
- **secure authentication:** role-based access control with jwt token implementation.
- **comprehensive security:** spring security implementation with proper authorization flows.
- **account management:** complete user lifecycle including account creation and deletion.
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
- **sensitive data protection:** ensuring medical information is properly secured and accessed only by authorized users.

## what I learned 💭
- **advanced form handling:** implementing react hook forms with comprehensive validation.
- **ui component architecture:** building custom input wrappers for consistent interface elements.
- **data table implementation:** integrating tanstack table with shadcn.
- **efficient data loading:** creating pagination systems for handling large datasets.
- **date handling techniques:** properly using `parseIso` from date-fns to avoid timezone issues.
- **global state architecture:** implementing redux for application-wide state management.
- **ui library customization:** adapting shadcn components to match project requirements.
- **role-based authorization:** managing different user types with appropriate access controls.
- **api security implementation:** configuring spring boot security for protected endpoints.

## limitations 🚨
- **static medication database:** medications are pre-defined rather than dynamically sourced.
- **limited authentication options:** no support for third-party providers like github or google.
- **basic analytics capabilities:** minimal reporting tools for administrative oversight.
- **notification system constraints:** lack of real-time alerts for appointments and updates.
- **isolated ecosystem:** no integration with external healthcare information systems.

## improvements 🌱
- **doctor review system:** implement a rating and feedback mechanism for healthcare providers.
- **ai-powered recommendations:** develop intelligent medication suggestions based on patient profiles.
- **communication platform:** add real-time messaging between patients and medical staff.
- **mobile application support:** create native mobile experiences for ios and android.
- **telehealth integration:** implement video consultation capabilities for remote appointments.
- **expanded analytics dashboard:** develop comprehensive reporting tools for administrators.
- **health record integration:** connect with external electronic health record systems.
- **appointment optimization:** implement intelligent scheduling based on doctor availability patterns.

## .env file & application.properties 📄
this project requires `.env` files for both the server and client, located in their respective folders. rename the 
`.env.example` file in each folder to `.env`, and update it with the necessary values. ensure these files are 
configured properly and not committed to version control.

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
