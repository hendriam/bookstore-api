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
    volumes:
      - ./:/app
      - /app/node_modules
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

## How to Use the API
Each of these cURL commands interacts with the API’s endpoints. Ensure the server is running at http://localhost:3000 and that you’ve set up your .env file correctly.

### User Registration, Login, and Profile Viewing

#### Register a New User
To create a new user account, use the following `POST` request. Replace `fullname`, `email`, `password`, and `role` values as desired.

**Role `admin`**
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": "Administrator",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "admin"
}'
```

**Role `user`**
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "johndoe123",
  "role": "user"
}'
```

**Explanation**:
- `role`: The user role, typically set to "user" during registration.

#### Log In
Use the following command to log in and retrieve a JWT token. This token is necessary to authenticate subsequent requests.

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@gmail.com",
  "password": "admin123"
}'
```

**Expected Response:**
- A successful login returns a JSON response containing a JWT token. Copy this token to use in future requests requiring authentication.

```bash
{
  "token": "your_jwt_token_here"
}
```

#### View User Profile
Once logged in, use the JWT token to retrieve the user’s profile information. Replace `your_jwt_token` with the actual token received from the login response.

```bash
curl -X GET http://localhost:3000/api/v1/users/profile \
-H "Authorization: Bearer your_jwt_token"
```

**Explanation:**
- `Authorization`: The Bearer token should include the JWT obtained from the login response.

**Expected Response**:
- The user’s profile information, including fullname, email, and role.

**Example Response:**
```bash
{
 "profile": {
   "_id": "672ddc89bafe626835487218",
   "fullname": "Administrator",
   "email": "admin@gmail.com",
   "password": "$2b$10$PMpIQ2WkgMEEeVxdzz.SKOE8F3e82zuL9LApj0YFFY.w1Vxg7VA/m",
   "role": "admin",
   "createdAt": "2024-11-08T09:40:25.530Z",
   "updatedAt": "2024-11-08T09:40:25.530Z",
   "__v": 0
 }
}
```

### Category, Tag, Product
Only users with the Admin role have permission to perform certain actions on categories, tags and products:
- `Create`: Only Admins can add a new categories, tags and products.
- `Update`: Only Admins can modify existing products, including details such as name, price, category, and tags.
- `Delete`: Only Admins can delete categories, tags and products.

#### Create a New Category
To add a new category, use the following `POST` request with the JWT `token` for authentication. Adjust the category fields as necessary.

```bash
curl -X POST http://localhost:3000/api/v1/categories \
-H "Content-Type: application/json" \
-H "Authorization: Bearer admin_jwt_token" \
-d '{
  "name": "Javascript"
}'
```

#### Create a New Tag
To add a new tag, use the following `POST` request with the JWT `token` for authentication. Adjust the tag fields as necessary.

```bash
curl -X POST http://localhost:3000/api/v1/tags \
-H "Content-Type: application/json" \
-H "Authorization: Bearer admin_jwt_token" \
-d '{
  "name": "nodejs"
}'
```

#### Create a New Product
This command demonstrates creating a new product with image file upload functionality. Ensure `path/to/your-image.jpg` with the actual path to the image file on your machine.

```bash
curl -X POST http://localhost:3000/api/v1/products \
-H "Authorization: Bearer admin_jwt_token" \
-F "name=Clean Code" \
-F "description=This new edition..." \
-F "price=39.99" \
-F "category=672de7dbbafe626835487230" \
-F "tags=672de7d5bafe62683548722d,672df202bafe6268354872da" \
-F "image=@path/to/your-image.jpg"
-F "stock=10"
```

**Explanation**:
- `-F "category=672de7dbbafe626835487230"`: Specifies the category of the product based on category_id.
- `-F "tags=672de7d5bafe62683548722d,672df202bafe6268354872da"`: Adds tags for the product based on tag_id. You can separate multiple tags by commas.
- `-F "image=@path/to/your-image.jpg"`: Uploads the image file. Replace path/to/your-image.jpg with the actual file path.

### Read All Products with `Pagination` and `Filtering`
The `GET` request to retrieve all products supports pagination and filtering options to help users find products more efficiently. Below are the available query parameters that can be used to customize the results:
- `search`: Searches for products by name or description
    - Example: `?search=nodejs`
- `page`: Specifies the page number of results to retrieve. Default is `1`
    - Example: `?page=2`
- `limit`: Limits the number of products per page. Default is `10`
    - Example: `?limit=20`
- `order`: Orders the results. Accepts either `asc` or `desc` to sort by ascending or descending order based on product name. Default is `asc`
    - Example: `?order=asc`
- `tags`: Filters products by tags. Multiple tags can be separated by commas.
    - Example: `?tags=66df211668763be9441127b3,66dea0724a277193efd8f17d`
- `category`: Filters products by category.
    - Example: `?category=66dea0594a277193efd8f17a`

**Example Request with Pagination and Filtering**
```bash
curl -X GET "http://localhost:3000/api/v1/products?page=1&limit=10&order=asc"
```

### Adding a Product to the Cart
Only authenticated users with the User role can add products to their shopping cart. This action is restricted to prevent unauthorized access and ensure that only valid users can manage their carts.

Replace `user_jwt_token` with the actual JWT token obtained from the login, and adjust the `productId` and `quantity` values as needed.

```bash
curl -X POST http://localhost:3000/api/v1/carts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer user_jwt_token" \
-d '{
  "productId": "672de817bafe626835487239",
  "quantity": 5
}'
```

**Expected Response:**
```bash
{
 "message": "Product added to cart successfully",
 "data": {
  "_id": "672dea4ebafe6268354872b1",
  "user": "672de756bafe626835487222",
  "items": [{
   "product": {
    "_id": "672de817bafe626835487239",
    "name": "Clean Code",
    "description": "This new edition examines the core of modern software development—understanding what is wanted and producing working, maintainable code that delights its users",
    "image": "uploads/image-1731061783503-12118857.jpg"
   },
   "quantity": 5,
   "price": 90,
   "total": 450,
   "_id": "672dea4ebafe6268354872b2"
  }],
  "totalQuantity": 5,
  "totalPrice": 450,
  "createdAt": "2024-11-08T10:39:10.363Z",
  "updatedAt": "2024-11-08T10:39:41.399Z",
  "__v": 2
 }
}
```

> **Access Control Note**: Only User role accounts are permitted to perform this action. Guest users and Admin accounts are not authorized to add products to a cart.

### Placing an Order
To create an order, an authenticated User can finalize the items in their shopping cart. This process requires authentication and specific permissions restricted to the User role.

#### Order Request Structure:
To place an order, send a `POST` request to the `/api/v1/orders endpoint`. The order will use the items currently in the user's cart, along with the selected shipping address.

Use the following `cURL` command to place an order. Replace `your_jwt_token` with the actual JWT token obtained from login.

```bash
curl -X POST http://localhost:3000/api/v1/orders \
-H "Content-Type: application/json" \
-H "Authorization: Bearer user_jwt_token"
```

**Expected Response:**
A JSON response with details of the placed order, including order ID, items ordered, total amount, shipping address, and order status.

```bash
{
 "message": "Order created successfully",
 "data": {
  "_id": "672eb6eb85ba4d00efa65340",
  "user": {
   "_id": "672ea94fefd14512f98d678d",
   "fullname": "John Doe",
   "email": "johndoe@gmail.com",
   "role": "user"
  },
  "items": [
   {
    "product": {
    "_id": "672eaa13efd14512f98d679d",
    "name": "Clean Code 1",
    "description": "This new edition examines the core of modern software development—understanding what is wanted and producing working, maintainable code that delights its users",
    "image": "uploads/image-1731111443760-854778888.jpg"
    },
    "quantity": 1,
    "price": 90,
    "_id": "672eb6eb85ba4d00efa65341"
   }
  ],
  "total": 90,
  "shippingAddress": {
   "_id": "672eb5e8fc8a182d6e5b6096",
   "recipientName": "John Doe",
   "streetAddress": "Jl. Medan",
   "city": "Medan Kota",
   "state": "Sumatera Utara",
   "postalCode": "20245",
   "country": "Indonesia",
   "phoneNumber": "0000000000",
   "label": "home",
   "isDefault": true,
   "user": "672ea94fefd14512f98d678d",
   "createdAt": "2024-11-09T01:07:52.254Z",
   "updatedAt": "2024-11-09T01:07:52.254Z",
   "__v": 0
  },
  "status": "Pending",
  "createdAt": "2024-11-09T01:12:11.293Z",
  "updatedAt": "2024-11-09T01:12:11.293Z",
  "__v": 0
 }
}
```

### Importing API Collection for Detailed Examples
For a more comprehensive demonstration of each API endpoint, including all CRUD operations and authentication flows, please import the provided JSON collection file into Postman or Insomnia. This collection contains pre-configured requests for each API endpoint, making it easy to explore and test the API.

1. Download the JSON Collection: Locate the API collection JSON file in this repository.
2. Import into Postman or Insomnia:
    - Open Postman or Insomnia.
    - Select the "Import" option and choose the JSON file.
3. Run Requests: Each endpoint is organized with examples, including:
    - CRUD operations for products, categories, and tags.
    - Authentication (register, login, profile).
    - Shopping cart and order management.

Using this collection, you can quickly test the API without manually constructing requests, making it easier to understand the API's functionality and structure.

## Contributing
We welcome contributions to this project! If you’d like to help improve the API, whether by fixing bugs, enhancing existing features, or adding new ones, please feel free to contribute.

**Contribution Guidelines**
- `Bug` Fixes: Please describe the bug and your approach to fixing it.
- `New` Features: Provide a clear explanation of the feature and its use case.
- `Code` Quality: Follow best practices for code quality and readability.
- `Testing`: Make sure to test your changes thoroughly before submitting.

Thank you for contributing to this project! Every contribution helps make this API better for everyone.