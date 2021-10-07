import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = 5001;

// const users = [
//   {
//   "createdAt": "2021-10-01T00:49:47.780Z",
//   "name": "Bennie Aufderhar",
//   "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//   "age": 59,
//   "color": "yellow",
//   "id": "2"
//   },
//   {
//   "createdAt": "2021-09-30T14:22:51.638Z",
//   "name": "Lana Witting",
//   "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//   "age": 57,
//   "color": "yellow",
//   "id": "3"
//   },
//   {
//   "createdAt": "2021-09-30T18:01:06.642Z",
//   "name": "Vickie Brekke",
//   "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//   "age": 90,
//   "color": "yellow",
//   "id": "4"
//   },
//   {
//   "createdAt": "2021-09-30T09:39:22.586Z",
//   "name": "Al Runolfsdottir",
//   "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//   "age": 39,
//   "color": "orange",
//   "id": "5"
//   },
//   {
//   "createdAt": "2021-09-30T18:22:41.955Z",
//   "name": "Sam Orn",
//   "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//   "age": 48,
//   "color": "orange",
//   "id": "6"
//   },
//   {
//   "createdAt": "2021-09-30T18:30:05.224Z",
//   "name": "Grace Grimes",
//   "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//   "age": 78,
//   "color": "orange",
//   "id": "7"
//   },
//   {
//   "createdAt": "2021-09-30T11:26:57.667Z",
//   "name": "Cindy Reinger",
//   "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//   "age": 20,
//   "color": "orange",
//   "id": "8"
//   },
//   {
//   "createdAt": "2021-10-01T06:26:55.203Z",
//   "name": "Beth Koelpin",
//   "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//   "age": 20,
//   "color": "purple",
//   "id": "9"
//   },
//   {
//   "createdAt": "2021-09-30T12:28:17.426Z",
//   "name": "Doug Mayer",
//   "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//   "age": 0,
//   "color": "cyan",
//   "id": "10"
//   },
//   {
//   "createdAt": "2021-10-01T01:09:41.654Z",
//   "name": "Mrs. Garrett Becker",
//   "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//   "age": 45,
//   "color": "orange",
//   "id": "11"
//   }
//   ]


// tell express waht format data you are going to get jon,xml
// middleware - gatekeeper 
// aa the request body - will be converted  to json 
app.use(express.json());
// express.json() - inbuilt middleware
// 3 party  , custom middleware 
 

// password 
async function createConnection(){
         const MONGO_URL = process.env.MONGO_URL;
      //   mongodb+srv://sandeep:<password>@cluster0.4bf2f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
      // const MONGO_URL= "";
         const client = new MongoClient(MONGO_URL);

         await client.connect();

         console.log("sucessfully connected!");
        //  const insertdata = await client.db("users").collection("people").insertMany(users);
         return client;
         
        //  const user = await  client 
        //  .db("users")
        //  .collection("people")
        //  .findOne({id:"5"});


        //  console.log(user);
       
  }


app.get("/",(request,response) => {
     response.send("hello, all!!!");
});

  // createConnection();



app.get("/users/:id", async (request,response) => {
    console.log(request.params);
    const id = request.params.id;

    const client = await createConnection();
      const user = await  client 
         .db("users")
         .collection("people")
         .findOne({id:id});
          response.send(user);
});


app.get("/users", async(request,response) => {
  const client = await createConnection();
      const users = await  client 
         .db("users")
         .collection("people")
         .find({}).toArray();
          response.send(users);
          console.log(users);
  
  });

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


// Create user 
app.post("/users", async(request,response) => {
  const client = await createConnection();
  const addUsers = request.body;
      const result = await  client 
         .db("users")
         .collection("people")
         .insertMany(addUsers)
          response.send(result);
          console.log(result);
  
  });


app.delete("/users/:id", async (request,response) => {
  console.log(request.params);
  const id = request.params.id;

  const client = await createConnection();
    const user = await  client 
       .db("users")
       .collection("people")
       .deleteOne({id:id});
console.log(user)
        response.send(user);
});
// update 
app.patch("/users/:id", async (request,response) => {
  console.log(request.params);
  const id = request.params.id;

  const client = await createConnection();
  const newData = request.body;
  console.log(id,request.body);
    const user = await  client 
       .db("users")
       .collection("people")
       .updateOne({id:id}, {$set:newData});
       console.log(user)
        response.send(user);
});


app.listen(PORT,() => console.log("the server is started in",PORT));