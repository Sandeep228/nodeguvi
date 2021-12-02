import {   genPassword,createConnection,getManagers,createManager }  from "../helper.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


//router
const router = express.Router();



router.get("/", async(request,response) => {
    const client = await createConnection();
    const managers = await   getManagers(client)
    response.send(managers);
});
  

router.post("/signup", async(request,response) => {
  const client = await createConnection();
  const {username, password} = request.body;
  console.log(username,password);
  const hashedPassword   = await genPassword(password);
  const result = await  createManager(client, username, hashedPassword);
  console.log(result)
  response.send(result);
    });
  
router.post("/login", async(request,response) => {
    const client = await createConnection();
    const {username, password} = request.body;
    const result = await client.db("users").collection("managers").findOne({username:username});
    console.log(result);
    const storedDbPassword = result.password;
    const isPasswordMatch =   await bcrypt.compare(password,storedDbPassword);
    if(isPasswordMatch){
        const token = jwt.sign({id:result._id},process.env.SECRET_KEY);
        response.send({ message:"Successful login", token:token});
    }
    else {
            response.send({ message:"Invalid login"});
    }
});
       

export  const managerRouter  = router ;

