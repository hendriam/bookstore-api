# Monolith Repository API
This project is a simple RESTful API with a monolithic architecture, built using NodeJS. A monolithic architecture is a design pattern where all the components of the application are unified into a single codebase, making it simpler to develop and deploy but potentially more challenging to scale as the application grows.

Additionally, this project implements the repository pattern, which is a design approach that abstracts the data access logic and separates it from the business logic. This pattern helps to create a more maintainable and testable codebase by providing a clean separation between the application’s core functionalities and data operations.
And this project demonstrates how to implement this design pattern in a RESTful API.

<b>This project is a simulation of an e-commerce application designed to cover various features. The following features are implemented:</b>
- <b>Product Management</b>: CRUD operations for products, including managing prices, categories, and tags.
- <b>User Management</b>: Managing users, including registering, logging in, and viewing their profile. Users have three roles: user, admin, and guest, each with different access levels and permissions.
- <b>Cart Management</b>: Users can add products to their own cart, delete items, and update quantities in the cart.
- <b>Security</b>: Authorization with CASL and authentication using JWT.
- <b>Optimization</b>: Implementing caching using Redis to improve performance on data requests.
- <b>Repository Pattern</b>: Using a modular approach with models, repositories, services, and controllers to separate code responsibilities and ease development.
- <b>Checkout (coming soon)</b>: The checkout process, including total price calculation and stock reduction, which will only happen after the payment is completed. (This feature is not yet finished and will be added later).
- <b>Order Management (coming soon)</b>: Records orders after users complete the checkout process, saving details such as shipping addresses and transaction totals. (This feature is also not yet finished and will be added later.)

<b>Technologies used in this project:</b>
- <b>[Express](https://expressjs.com/)</b> : Used for building HTTP servers and handling routes as well as requests/responses efficiently.
- <b>[Redis](https://redis.io/)</b>: Serves as a caching system to store frequently accessed query results, reducing the load on the database and improving performance. Caching is only applied to the `getAllProducts` operation.
- <b>[JWT](https://jwt.io/)</b>: Used as an authentication middleware to verify each request that requires authentication. This middleware checks the Authorization header for the JWT token and verifies its validity. If valid, the middleware adds user information to the request object and proceeds to the next middleware.
- <b>[CASL](https://casl.js.org/v6/en/)</b>: Used as an authorization middleware to control access based on user roles or specific permissions. CASL ensures that only users with the appropriate access rights can access resources or perform certain actions.
