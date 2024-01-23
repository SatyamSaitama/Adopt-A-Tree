# Adopt-A-Tree Backend

## Introduction

The Adopt-A-Tree backend is a modular and distributed system designed to manage users, trees, and produce production. This README provides an overview of the project's architecture, services, technologies used, and guidelines for installation and usage.

## Services

### 1. UserService

Responsible for user registration, login, and management.
Utilizes bcrypt for password hashing and jwt for authentication.
Supports user details retrieval and listing all users.
Listens on port 3001.

### 2. TreeService

Manages tree-related operations, including tree addition, deletion, and retrieval.
Implements tree adoption and information calculation functionalities.
Requires authentication using a middleware.
Listens on port 3002.

### 3. ProduceService

Handles produce production, sharing, and information calculation.
Integrates with TreeService and UserService for data retrieval.
Supports product creation and sharing calculation.
Listens on port 3003.

### 4. Utils

Contains utility functions shared between ProduceService and TreeService.
Functions include fetching user trees and calculating the time since adoption.

### 5. API Gateway (ApiGateWay.js)

Acts as a centralized entry point for external communication.
Implements authentication using a middleware.
Forwards requests to the appropriate service based on the path.

## Installation

In each service directory, install the required packages using:

```bash
npm install
```

### Individual Service Entry Points

- **ProduceService:**
  ```bash
  cd ProduceService
  npm install
  node index.js
  ```

- **TreeService:**
  ```bash
  cd TreeService
  npm install
  node index.js
  ```

- **UserService:**
  ```bash
  cd UserService
  npm install
  node index.js
  ```

## Running the API Gateway

To run the API Gateway, execute:

```bash
npm install
node main.js
```

## Technologies Used

- Node.js: For server-side JavaScript runtime.
- Express.js: For building web applications and APIs.
- Sequelize: As an ORM for interacting with the SQLite database.
- Axios: For making HTTP requests between services.
- bcrypt: For password hashing.
- jwt: For authentication and token generation.
