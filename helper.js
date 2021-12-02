import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

  async function getUsers(client){
    return await  client 
    .db("users")
    .collection("people")
    .find({}).toArray();
  
  }

  async function getMovies(client){
    return await  client 
    .db("users")
    .collection("movies")
    .find({}).toArray();
  
  }


   async function createUsers(client,addUsers){
    return await  client 
    .db("users")
    .collection("people")
    .insertMany(addUsers)
  
  }

  async function createMovies(client,addMovies){
    return await  client 
    .db("users")
    .collection("movies")
    .insertMany(addMovies)
  
  }

   async function deleteUserById(client,id){
    return await  client 
    .db("users")
    .collection("people")
    .deleteOne({id:id});
  
  }



   async function updateUserById(client,id,newData){
    return await  client 
    .db("users")
    .collection("people")
    .updateOne({id:id},{ $set: newData});
  
  }


   async function getUserById(client,id){
    return await  client 
    .db("users")
    .collection("people")
    .findOne({id:id});
  }


   async function getManagers(client){
    return await  client 
    .db("users")
    .collection("managers")
    .find({}).toArray();
 }
     async function createManager(client, username, hashedPassword) {
    return await client
      .db("users")
      .collection("managers")
      .insertOne({ username: username, password: hashedPassword });
    }
    async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt)
    }


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


  export  {
      getUsers,
      createManager,
      createUsers,
      deleteUserById,
      updateUserById,
      getUserById,
      getManagers,
      genPassword,
      createConnection,
      createMovies,
      getMovies
    } ;
