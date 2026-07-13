# EMS Pro - Backend Architecture ⚙️

This directory contains the robust Express.js REST API that powers the Employee Management System. It is built strictly adhering to MVC architecture patterns, ensuring security, scalability, and maintainability.

## 🛠️ Technology Stack
- **Node.js**: Asynchronous, event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated web framework.
- **MongoDB**: NoSQL database for flexible data modeling.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Express-Validator**: Middleware for powerful request body validation.

---

## 🏛️ Architecture & Workflow

The backend utilizes a cleanly separated architecture to ensure separation of concerns:

```text
Client Request
      ↓
[ Router Layer ]       ➔ Maps HTTP endpoints to specific Controller functions.
      ↓
[ Middleware Layer ]   ➔ Performs structural validation (Express-Validator) and security checks.
      ↓
[ Controller Layer ]   ➔ Handles business logic, formats responses, and manages HTTP status codes.
      ↓
[ Model Layer ]        ➔ Mongoose ODM handles direct database queries and strict schema enforcement.
      ↓
[ MongoDB ]            ➔ Persistent storage.
      ↓
Client Response
```

### 📁 Folder Structure Explained
- `src/config/`: Contains database connection files and environment parsers.
- `src/controllers/`: Houses the business logic functions (`employeeController.js`).
- `src/middlewares/`: Global middlewares, such as `errorHandler.js` which catches and formats unhandled promise rejections.
- `src/models/`: Contains the Mongoose schemas (`Employee.js`).
- `src/routes/`: Express router definitions.
- `src/validations/`: Contains validation chains mapped directly to specific routes.

---

## 🛡️ Validation & Error Handling

- **Validation Flow**: Before a request hits the controller, it passes through `express-validator`. If validation fails, a `400 Bad Request` is immediately returned with an array of specific field errors, preventing bad data from reaching the database.
- **Error Handling**: A centralized `errorHandler.js` middleware wraps the application. Any exceptions thrown in controllers are passed to this middleware to ensure the client receives a consistently formatted JSON error response rather than an HTML stack trace.

## 💾 MongoDB Schema (Employee)

The `Employee` collection utilizes strict typing and indexing:
- `fullName` (String, required, min 3 chars)
- `email` (String, required, unique, lowercase)
- `mobileNumber` (String, required)
- `department` (String, enum: HR, Engineering, Sales, Marketing, Finance)
- `designation` (String, required)
- `joiningDate` (Date, required)
- `status` (String, enum: Active, Inactive)
- *Timestamps* (createdAt, updatedAt are automatically managed by Mongoose).

---

## 📡 API Documentation

Base URL: `/api/employees`

All responses follow this standard format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success/error message"
}
```

| Method | Endpoint | Description | Request Body / Params | Status Code |
|--------|----------|-------------|----------------------|-------------|
| **GET** | `/api/employees` | Fetch all employees with filters. | **Query:** `page`, `limit`, `search`, `department`, `status`, `sortBy` | 200 OK |
| **GET** | `/api/employees/:id` | Fetch a single employee by ID. | **Path:** `id` (Mongo ObjectId) | 200 OK / 404 Not Found |
| **POST** | `/api/employees` | Create a new employee. | **Body:** `{ fullName, email, mobileNumber, department, designation, joiningDate, status }` | 201 Created / 400 Bad Request |
| **PUT** | `/api/employees/:id` | Update an existing employee. | **Path:** `id`<br>**Body:** Fields to update | 200 OK / 404 Not Found |
| **DELETE** | `/api/employees/:id` | Remove an employee record. | **Path:** `id` | 200 OK / 404 Not Found |

### Example Request (Fetch Employees with Filters)
**GET** `/api/employees?department=Engineering&status=Active&page=1&limit=10`

### Example Response (Success)
```json
{
  "success": true,
  "data": {
    "employees": [
      {
        "_id": "64bc1...",
        "fullName": "Jonathan Doe",
        "email": "jonathan@example.com",
        "department": "Engineering",
        "status": "Active",
        "joiningDate": "2023-01-15T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 42,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

## 💻 Development Workflow

1. Clone and install dependencies (`npm install`).
2. Copy `.env.example` to `.env` and fill in `MONGODB_URI`.
3. Run `npm run dev` to start the development server using nodemon.
4. The server runs on port `5000` by default.

### Environment Variables
- `PORT`: Port on which the Express server runs (default: 5000).
- `MONGODB_URI`: Connection string for your MongoDB database.
- `NODE_ENV`: Application environment (`development` or `production`).

### Production Build
Since this is a Node.js API, there is no distinct "build" process. Ensure dependencies are installed via `npm ci --omit=dev`, and start the server using `npm start` (which maps to `node src/server.js`).
