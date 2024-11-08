# Monolith Repository Restful API
This project is a simple RESTful API with a monolithic architecture, built using NodeJS. A monolithic architecture is a design pattern where all the components of the application are unified into a single codebase, making it simpler to develop and deploy but potentially more challenging to scale as the application grows.

Additionally, this project implements the repository pattern, which is a design approach that abstracts the data access logic and separates it from the business logic. This pattern helps to create a more maintainable and testable codebase by providing a clean separation between the application’s core functionalities and data operations.
And this project demonstrates how to implement this design pattern in a RESTful API.

**This project is a simulation of an e-commerce application designed to cover various features. The following features are implemented:**
- **Product Management**: CRUD operations for products, including managing prices, categories, and tags.
- **User Management**: Managing users, including registering, logging in, and viewing their profile. Users have three roles: user, admin, and guest, each with different access levels and permissions.
- **Cart Management**: Users can add products to their own cart, delete items, and update quantities in the cart.
- **Security**: Authorization with CASL and authentication using JWT.
- **Optimization**: Implementing caching using Redis to improve performance on data requests.
- **Repository Pattern**: Using a modular approach with models, repositories, services, and controllers to separate code responsibilities and ease development.
- **Checkout (coming soon)**: The checkout process, including total price calculation and stock reduction, which will only happen after the payment is completed. (This feature is not yet finished and will be added later).
- **Order Management (coming soon)**: Records orders after users complete the checkout process, saving details such as shipping addresses and transaction totals. (This feature is also not yet finished and will be added later.)

**Technologies used in this project:**
- [**Express**](https://expressjs.com/)</b> : Used for building HTTP servers and handling routes as well as requests/responses efficiently.
- [**Redis**](https://redis.io/)</b>: Serves as a caching system to store frequently accessed query results, reducing the load on the database and improving performance. Caching is only applied to the `getAllProducts` operation.
- [**JWT**](https://jwt.io/)</b>: Used as an authentication middleware to verify each request that requires authentication. This middleware checks the Authorization header for the JWT token and verifies its validity. If valid, the middleware adds user information to the request object and proceeds to the next middleware.
- [**CASL**](https://casl.js.org/v6/en/)</b>: Used as an authorization middleware to control access based on user roles or specific permissions. CASL ensures that only users with the appropriate access rights can access resources or perform certain actions.
- [**Winston**](https://www.npmjs.com/package/winston): Used for logging

## Installation and Running the Project

### Prerequisites
Before you can run the project locally, you'll need to have the following installed on your machine:
- [**NodeJS**](https://nodejs.org/) (version v20.9.0+ recommended)
- [**MongoDB**](https://www.mongodb.com/): For database.
- [**Redis**](https://redis.io/): For caching.
- [**Git**](https://git-scm.com/): For cloning the repository.
- [**Docker and Docker Compose**](https://www.docker.com/) (Optional: If you are familiar with it)

### Clone the Repository
```bash
git clone https://github.com/hendriam/nodejs-monolith-restful-api.git
cd nodejs-monolith-restful-api
```

### Create an `.env` File
Create an  `.env` file in the root of the project, then add the following environment variables according to your configuration:

```bash
PORT=3000
MONGO_URI=mongodb://mongo-server:27017/bookstore
JWT_SECRET=ccee94dea3077d9f7fff8d00ddf3afe3ce747e5f1b388f661b698cddeaca4e98
JWT_EXPIRED=1d
LEVEL_LOG=info
REDIS_URL=redis://redis-server:6379
```
These variables will be used by the application when running in a Docker container.

### Create the uploads Folder
Create a folder named `uploads` in the root of the project. This folder will store uploaded image files.

```bash
mkdir uploads
```

> Note: Ensure this folder has proper write permissions, as it will store uploaded images.

### Running with Docker Compose
If you want to run the project using Docker Compose, follow these steps:

#### Configure Docker Compose
Docker Compose is already set up to run containers for `App-Server`, `MongoDB`, and `Redis`. Make sure the `docker-compose.yml` file in the project root is configured as follows (adjust if necessary):

```bash
version: "3"
services:
  app-server:
    build: .
    image: hendriam18/bookstore:v1
    env_file:
      - .env
    ports:
      - 3000:3000
  mongo-server:
    image: mongo:8.0
    ports:
      - 27017:27017
  redis-server:
    image: redis:latest
    ports:
      - 6379:6379
networks:
  default:
    external: true
    name: local
```

#### Start Docker Compose
Run the following command to start the containers:

```bash
docker-compose up -d
```

This command will:

- Start a MongoDB container on `localhost:27017`
- Start a Redis container on `localhost:6379`
- Run the API on `localhost:3000`

#### Verify the API
Once all containers are up, you can access the API at http://localhost:3000. Use tools like Postman or cURL to verify the available endpoints.

Example endpoint verification:
```bash
curl http://localhost:3000/api/v1/products
```

### Running Manually (Without Docker)
If you prefer to run the project manually without Docker, follow these steps:

#### Install Dependencies
```bash
npm install
```

#### Start MongoDB and Redis Locally
Ensure MongoDB and Redis are installed and running on your local machine.
- MongoDB typically runs at `mongodb://localhost:27017`.
- Redis typically runs at `localhost:6379`.

Adjust the `MONGO_URI` and `REDIS_URL` variables in the .env file to match this configuration.

#### Start the Express Server
Once all prerequisites are running, start the server with:

```bash
node index.js
```

If the server is successfully connected to `MongoDB` and `Redis` in your terminal, it will look like this:

```bash
info: Server running on port 3000
info: Redis client connected
info: MongoDB connected successfully
```

#### Verify the API
After the server is running, you can access the API at http://localhost:3000. Use tools like Postman or cURL to verify the available endpoints.

Example endpoint verification:
```bash
curl http://localhost:3000/api/v1/products
```

## User Roles and Permissions
The application supports three types of users: Guest, User, and Admin. Each type has distinct permissions, enabling tailored access and functionality.

1. **Guest User**
    - Guest users can browse the available products, categories, and tags.
    - No authentication is required for this access, allowing guests to freely explore the catalog.
2. **User**
    - Authenticated users can:
        - View products, categories, and tags.
        - Add products to their cart and proceed with orders.
        - Manage personal addresses, such as adding a shipping address.
    - **Authentication Required**: Users must be logged in to access cart, order, and address management features.
3. **Admin**
    - Admin users have full management rights, including:
        - Managing all products, categories, tags, users, addresses, and orders.
        - Updating order statuses, which is essential for order processing.
    - Restrictions: Admins cannot delete orders placed by other users, maintaining order integrity.

Each role has specific privileges, ensuring security and role-based access across different parts of the application. This setup supports a clear distinction between guests, regular users, and administrators.

## How to Use the API (coming soon)