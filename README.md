# TechNest Hackathon Contest Participation Website

This is a MERN stack project for a hackathon contest participation website, developed for the technical club of [SCE, Supaul](https://www.scesupaul.org/).

## Project Structure

### Frontend

- **public**: Contains static files like `index.html`.
- **src**: Contains the source code.
  - **assets**: Static assets like the favicon.
  - **components**: React components.
    - **Admin**: Admin-related components.
      - `Admin.jsx`: Admin panel component.
    - **utils**: Utility functions and components.
      - `SmoothScroll.jsx`: Utility for smooth scrolling.
    - `Event.jsx`: Event component.
    - `EventCard.jsx`: Event card component.
    - `EventDetails.jsx`: Event details component.
    - `Footer.jsx`: Footer component.
    - `Gallery.jsx`: Gallery component.
    - `Home.jsx`: Home component.
    - `Loader.jsx`: Loader component.
    - `Login.jsx`: Login component.
    - `Navbar.jsx`: Navigation bar component.
    - `Signup.jsx`: Signup component.
  - `App.jsx`: Main application component.
  - `index.css`: Global CSS styles.
  - `main.jsx`: Entry point for the React application.

### Backend

- **connection**: Database connection files.
- **middleware**: Middleware files.
- **routes**: API route files.
- **utils**: Utility files.
- `.env`: Environment variables.
- `App.js`: Main application file.
- `package.json`: Node.js dependencies.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/therajusah/TechNest.git
   cd TechNest
   ```

2. Install frontend dependencies:

   ```bash
   cd Frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../Backend
   npm install
   ```

### Running the Application

#### Backend

1. Navigate to the backend directory:

   ```bash
   cd Backend
   ```

2. Create a `.env` file in the `Backend` directory with the following content:

   ```plaintext
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```

3. Start the backend server:

   ```bash
   node app.js
   ```

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../Frontend
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:3000`.

## Features

- User-friendly interface for event participation.
- Admin panel for managing events.
- Smooth navigation and responsive design.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Contact

If you have any questions or feedback, please contact Raju Kumar at [LinkedIn](https://www.linkedin.com/in/therajusah/).

