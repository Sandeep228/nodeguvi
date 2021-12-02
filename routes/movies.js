
import express from 'express';
import {auth} from '../middleware/auth.js';
import { createConnection,getUserById,getUsers,createUsers,getMovies,createMovies,deleteUserById,updateUserById } from "../helper.js";

const router = express.Router();


router.get("/",async(request,response) => {
      const client = await createConnection();
      const users = await  getMovies(client); 
      response.send(users);
  
  });

  
// router.get("/:id", async (request,response) => {
//     console.log(request.params);
//     const id = request.params.id;
//     const client = await createConnection();
//     const user = await   getUserById(client)
//     response.send(user);
// });

router.post("/", async(request,response) => {
    const client = await createConnection();
    const addMovies = request.body;
    const result = await  createMovies(client,addMovies)
    response.send(result);
    console.log(result);
    
    });
  
  
  
// router.delete("/:id", async (request,response) => {
//     console.log(request.params);
//     const id = request.params.id;
//     const client = await createConnection();
//     const user = await deleteUserById(client,id);
//     response.send(user);
//   });
  
  
  
//   // update 
// router.patch("/:id", async (request,response) => {
//   console.log(request.params);
//   const id = request.params.id;
//   const client = await createConnection();
//   const newData = request.body;
//   console.log(id,request.body);
//   const user = await  updateUserById(client,id,newData);
//   response.send(user);
// });
  

export  const moviesRouter  = router ;

 