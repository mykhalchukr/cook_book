Client side of application was written in React, application state stores in Redux. Server-side was written in Node.js (express.js framework). 
Application data stores in MongoDB. Application was deployed in Heroku. 

All recipes are displayed and sorted by date of their creation. 
Features done:  

 - Add new recipe; 
 - Edit current recipe; 
 - Delete current recipe; 
 - Adaptive layout;
 - Add new recipe, based on another one (culinary "fork" of recipe);
 - Recipes was sorted alphabetically;

Features to implement:  
- Information popups; 
- Loaders; 
- Recipe versions

Quick start: 

Install dependencies for server: 
  npm install  

Install dependencies for client side: 
  npm run client-install  

Run the client & server with concurrently: 
  npm run dev  

Server runs on http://localhost:5000 and client on http://localhost:3000
