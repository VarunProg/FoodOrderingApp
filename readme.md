## How to Use

1. Clone the repository to your local machine.
2. Install the necessary dependencies using the provided installation script.
3. Run the application on your preferred environment.
4. Access the application through the provided URL.
5. Explore the various features and functionalities to gain valuable insights into Web App for Order Management .

# Setup project in local enviornment
1. Git Clone Repo in local from url using below command
   ```bash
   git clone [https://github.com/VarunProg/FoodOrderingApp.git]
   ```
### Setup in local development enviornment with enviornment config

## open 2 terminal one for web and one for server 

#### For Client 
1. In new terminal go to client folder 
2. run npm i - this will install dev dependencies in local inside node_modules folder
3. run command: npm run dev - this will launch application on http://localhost:5173/ (check browser)

#### For Sever 
1. In new terminal go to sevrer folder 
2. run -> npm i - this will install dev dependencies in local inside node_modules folder
3. run -> npm start - this will launch server on port 3000 (keep it running for server api calls)

#### For MongoDB Setup:
1. MongoDB Credentials:
-  in server folder go to .env file 
- Inside the .env file, you will find an environment variable named MONGO_URI. This variable holds the credentials required to connect to the MongoDB database.

2. Edit the .env File:
-  Update the MONGO_URI value with your MongoDB connection string.
- Replace the existing connection string
 (mongodb+srv://varunchaudhary578:R914TnlGVrPgK0Qa@cluster1.lrkfn6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1) with your own MongoDB connection string.

 MONGO_URI = YOUR_MONGODB_CONNECTION_STRING

3. MongoDB Connection String:
-  The MongoDB connection string typically consists of: mongodb+srv://: The connection protocol.
- USERNAME:PASSWORD: Your MongoDB username and password.
-  @cluster-name.mongodb.net/: The MongoDB cluster name.
- DATABASE_NAME: The name of your MongoDB database.

## Authentication with Auth0

To enhance security and user-specific features, this application utilizes Auth0 for user authentication. 

1. **User Authentication:**
   - Users can sign in securely using Auth0, providing a seamless and protected experience.
   - Backend routes is also secured with accessToken using JWT only autorised user can hit the backend API.

   ## Features of the Application
   - Auth0 has been used to authorised the user
   - only authorised user can hit the api from frontend
   - backend also checks if the user is authorised then only backend api can be triggered (JWT Authentication is implemented)
   - on frontend routes are protected so that only authorised user gets access to application
   - routing has been implemented on the frontend to create-order and for landing page.
   - you can see on UI who created the order
   - sign in functionality with using Auth0
   - sign out
   - user can create the order (when order created alerts will be pop up on the screen)
   - user can delete the order (when user tries to delete the order user will be asked for confirmation)
   - On UI user can see who created the order with user's name

**ScreenShots**
   <img src="screenshots/create-order.png" alt="Project Logo" width="200"/>
   <img src="screenshots/createdOrder.png" alt="Project Logo" width="200"/>
