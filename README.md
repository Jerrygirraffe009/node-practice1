# node-practice1

This is simply a practice git repo

1. Clone the repo using "git clone"
2. Install express.js using "npm i express"
3. Install dotenv, nodemon as a Dev dependency using "npm i --save-dev dotenv nodemon"
4. Rename ".env-sample" to ".env" and update PORT number eg. PORT = 5000

6. To run the app use "nodemon app.js"
7. You can make the following API calls
- GET localhost:5000/              **returns "Welcome to API
- GET localhost:5000/courses.      **returns list of courses
- GET localhost:5000/course/1      **if course number is present, it will return course details
- POST localhost:5000/addcourse.   **send {"name": "coursename"} in POST BODY, as JSON/raw using Postman, will add "coursename" to end of "courses"
- PUT localhost:5000/updatecoruse. **send { "id" : "1", "name" : "coursename"} in PUT BODY, as JSON/raw using Postman, will update "coursename" if "id" exiist
  
 
