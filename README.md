# ReactJS Assignment: Employee Dashboard & Verification System
### Submitted by: Avishkar Kabadi
### Role: Software Developer
### Location: Pune, India

## 📌 Assignment Overview
- This assignment demonstrates a functional React application that integrates secure user authentication, external API consumption, data visualization, and hardware   - integration (Camera API). 
- The application is designed to handle real-world data inconsistencies and provide a responsive user experience.

## 🛠 Technical Implementation
### Core Framework & Styling
- Vite + React: Chosen for a fast, modern development environment.

- Tailwind CSS: Utilized for rapid UI development and responsive design across all 4 screens.

### State Management & Authentication
- The application uses a hybrid approach to ensure data persistence and security:

- Redux Toolkit: Used as the global state to manage the employee list and the active login session.

- Local Storage: Acts as a persistent backup. On login, the user's status and the API data are saved to local storage.

- Auth Guard (App.jsx): A local isLoggedIn variable in App.jsx determines access. It validates the user by checking if a valid session exists in either the Redux store or Local Storage. If neither is found, the user is redirected to the Login page.

### Libraries Used
- Routing: react-router-dom for managing the 4-screen flow (Login, List, Details/Camera, Photo Result).

- Charts: recharts for the salary bar graph of the first 10 employees.

- Maps: react-leaflet to visualize employee distribution by city.

- Camera: react-webcam to capture verification photos on the Details page.

## 🔄 Application Flow & Routing
- Login Page: Authenticates credentials (testuser/Test123). On success, it fetches data from the REST API, saves it to Redux/LocalStorage, and redirects.

- List Page: Displays the employee directory. Includes logic to handle the inconsistent array structures provided by the API by searching for specific data markers (e.g., searching for "$" to identify salary).

- Details & Camera Page: Shows specific employee info and opens a live camera feed. Clicking "Take Photo" captures a Base64 image.

- Photo Result Page: Displays the captured image and provides an option to download the photo or return to the directory.

## 💡 Creative Additions
- Salary Stats Screen: A dedicated visualization page using Recharts to show compensation trends.

- Global Map Screen: A mapping interface that groups employees by city, resolving coordinates from city names.

- Responsive UI: Fully optimized for both mobile and desktop views using Tailwind's grid and flex systems.

## ⚙️ How to Run
  - Install dependencies: 
```
     npm install
```
- Start development server: 
```
     npm run dev
```

- Build for production:
```
     npm run build
```