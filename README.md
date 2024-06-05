# Chat Application Backend   -> [Frontend](https://github.com/Gachegov59/chat-React)

## Project Description

This project sets up the backend for a chat application, built with Express.js and TypeScript. It focuses on providing secure and efficient RESTful APIs for user authentication, real-time communication, and message storage. 

The backend integrates JWT for secure authentication and utilizes MongoDB for data storage. The application is designed to support seamless real-time messaging and ensure data integrity and security through best practices.

## Key Features

### User Management
- User registration and login with secure password hashing using bcrypt.
- JWT-based authentication for session management.
- Profile management features allowing users to update their information.

### Real-Time Communication
- Real-time messaging using WebSockets with socket.io.
- Efficient message storage and retrieval using MongoDB.
- Notification system for new messages.

### Security
- Implementation of security best practices, including input validation with Joi and secure session management with express-session.
- Protection against common security vulnerabilities like CSRF and XSS.

## Tech Stack

- **TypeScript**: Enhances code quality and maintainability with static typing.
- **Express.js**: Simplifies routing and middleware integration, making the server more modular.
- **MongoDB**: Non-relational database for efficient data storage and retrieval.
- **JWT**: Secures user authentication.
- **Winston**: Logging library for monitoring and debugging.
- **Nodemailer**: Facilitates email notifications and communication.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chat-express.git
    ```
2. Navigate to the project directory:
    ```bash
    cd chat-express
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file based on the `.env.example` and fill in your environment variables.
5. Build the project:
    ```bash
    npm run build
    ```
6. Start the development server:
    ```bash
    npm run dev
    ```

## Scripts

- `dev`: Starts the development server with nodemon.
- `build`: Compiles TypeScript to JavaScript.
- `start`: Starts the compiled server.
- `test`: Runs unit tests with Jest.
- `test:e2e`: Runs end-to-end tests.

## Dependencies

- **bcrypt**: For password hashing.
- **cookie-parser**: Parses cookies attached to client requests.
- **cors**: Enables Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Node.js web application framework.
- **express-fileupload**: Middleware for handling file uploads.
- **express-session**: Manages sessions.
- **express-winston**: Integrates Winston logging with Express.
- **joi**: Validates request data.
- **jsonwebtoken**: Implements JSON Web Tokens for authentication.
- **mongoose**: MongoDB object modeling tool.
- **nodemailer**: Sends emails from Node.js.
- **passport**: Authenticates requests.
- **uuid**: Generates unique identifiers.
- **winston**: Logging library.

## Dev Dependencies

- **@types/bcrypt**: Type definitions for bcrypt.
- **@types/cookie-parser**: Type definitions for cookie-parser.
- **@types/cors**: Type definitions for cors.
- **@types/express**: Type definitions for Express.
- **@types/express-session**: Type definitions for express-session.
- **@types/jest**: Type definitions for Jest.
- **@types/jsonwebtoken**: Type definitions for jsonwebtoken.
- **@types/nodemailer**: Type definitions for nodemailer.
- **@types/passport**: Type definitions for passport.
- **@types/supertest**: Type definitions for supertest.
- **@types/uuid**: Type definitions for uuid.
- **@types/winston**: Type definitions for winston.
- **jest**: JavaScript testing framework.
- **nodemon**: Automatically restarts the server on file changes.
- **supertest**: HTTP assertions for testing.
- **ts-jest**: Jest transformer for TypeScript.
- **ts-node**: TypeScript execution environment for Node.js.
- **typescript**: JavaScript with static types.
