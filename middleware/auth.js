import { response } from "express";
import jwt from "jsonwebtoken";

// custom middleware is function 

export const auth = (request,respone,next) => {
    try {
        const token =  request.header("x-auth-token");
        console.log(token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch(err){
        response.status(401);
        response.send({error : err.message})
    }
};
