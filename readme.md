# Entertainment App Backend
This is the backend service for an entertainment app that provides user authentication, movie and TV series bookmarking features, and data persistence using MongoDB. The project is structured to maintain modularity and scalability.

## Backend Folder Structure :

# src
The main source folder containing the core codebase for APIs, configurations, models, utilities, and the application entry point.

### apis
Contains route files for handling requests related to movies, TV series, and user management.
- #### movies.js 
Defines API routes for managing movie bookmarks, allowing users to add and retrieve movie bookmarks.
- #### tv-series.js
Defines API routes for managing TV series bookmarks, enabling users to add and retrieve TV series bookmarks.
- #### user.js
Defines API routes for user authentication, registration, login, and profile management.


### config
Holds configuration files for logging, request monitoring, and authentication setup.
- #### logger.js
Configures the logging system to capture application logs, including errors and info messages, with customizable formats and levels.
- #### morgan.js
An HTTP request logger middleware that logs incoming requests, capturing status, response time, and additional error details.
- #### passport.js
Configures JWT authentication strategy to validate and authenticate users using JSON Web Tokens for secure access.


### models
Defines the schemas and database interactions for MongoDB collections such as movies, TV series, and users.
- #### db.js
Manages the MongoDB database connection, establishing the link between the application and the database.
- #### Movies.js
Defines the schema and model for storing movie bookmarks in the database, including user-related information.
- #### TV.js
Defines the schema and model for managing TV series data, such as bookmarks, in the database.
- #### User.js
Defines the schema and model for user data, including registration details, authentication, and profile management.


### utils
Includes reusable utility files like constants and shared messages used throughout the application.
- #### constants.js
Constants and messages used across the app.


## index.js
Entry point for initializing the server and connecting middleware, APIs, and the database.

## .env
Stores environment-specific variables like database URI and secret keys.

## .gitignore
Specifies files and directories to exclude from version control.

## package.json
The package.json file manages a Node.js project's metadata, dependencies, and scripts. 