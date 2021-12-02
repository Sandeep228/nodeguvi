import dotenv from "dotenv";
import express from 'express';
import {usersRouter} from './routes/users.js';
import { managerRouter } from './routes/manager.js';
import {moviesRouter} from './routes/movies.js';
import {getUsers,createManager,createUsers,deleteUserById,updateUserById,getUserById,getManagers} from './helper.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT; // heroku will automatically 

app.use(express.json()); // middleware data -> json 


app.get("/",(request,response) => {
     response.send("hello, all!!!");
});

app.use("/managers" , managerRouter);

app.use("/users" , usersRouter);

app.use("/movies",moviesRouter);

app.listen(PORT,() => console.log("the server is started in",PORT));




  // createConnection();

// app.get("/users",(request,response) => {
//      const {color,ageGt} = request.query;
//   if(!color &&  !ageGt)
//   {
//     response.send(users);
    
//   }
//   else if(color && !ageGt) {
//     response.send(users.filter((user) =>  user.color == color));
//   }
//   else if ( !color  && ageGt ) {
//     response.send(users.filter((user) =>  user.age >= ageGt));

//   }
//   else {
//     response.send(users.filter((user) =>  user.color == color &&  user.age >= ageGt));
//   }

// });