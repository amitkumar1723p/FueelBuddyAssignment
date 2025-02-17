import Fastify from 'fastify'
import { FastifyInstance } from 'fastify/types/instance';
 import{ Connectdb} from './Database/DatabaseConnection'
 import {userModel}  from './Model/model'
 
import { join } from 'path'
import dotenv from 'dotenv'
 

 
 
const fastify: FastifyInstance = Fastify()

const envfileabsPath =  join(process.cwd(),'Src','config' ,'.env')
dotenv.config({ path: envfileabsPath });

 

interface MyParams {
  id: string;
}
interface Update {

   name:String
    age:number,
    city:string}


    process.on("uncaughtException", (err) => {
      process.exit(1);
    });
    

    //  get env file  absloute path
// let envfileabsPath = join(process.cwd(),"CRUD_OPREATION", "Src" ,"Config", ".env");


// if (process.env.PRODUCTION != true) {
//   dotenv.config({ path: envfileabsPath });
// C:\Users\amitk\Desktop\FuelBuddy Assignment\\Src\Config\.env
// C:\Users\amitk\Desktop\FuelBuddy Assignment\\Src\Config\.env




Connectdb()

//  Get All user 
 
fastify.get('/', async (request, reply) => {
  try {
    
     const findAllUser = await userModel.find()

      if(findAllUser.length==0){
        reply.send({User:"User document is Empty please Create User"})
      }
       
      reply.send({User:findAllUser})
  } catch (error) {
    reply.send(error)
  }


 

})
 








// Create User 


fastify.post ('/', async (request,reply)=>{
try {
          

  const UserDocument = new userModel(request.body)
   await  UserDocument.save()
 reply.send({success:true ,message:"user create successfully"})
  
} catch (error) {
reply.send(error)
}
  


}) 
 







// Update User by Id

fastify.put<{ Params: MyParams , Body: Update}> ('/:id', async (request,reply)=>{
 
  try {
    const id = request.params.id;
    
    
  const user=  await  userModel.findById(id)
  if(!user){
    reply.send({success:false ,message:"This user is not Exist" })
  }
      
  const userUpdate= await  userModel.findByIdAndUpdate(id ,request.body,{returnDocument:'after'})
   
  reply.send({success:true ,message:"Update usersuccessfully" ,UpdatedDocument:userUpdate})
} catch (error) {
   
  reply.send(error)
  }
  

})








// deleteUser
 
fastify.delete<{ Params: MyParams }> ('/:id', async(request,reply)=>{
  try {
    
    const id = request.params.id;
    const user=  await  userModel.findById(id)
    if(!user){
      reply.send({success:false ,message:"This user is not Exist" })
    }
       
   await userModel.findByIdAndDelete(id)


   reply.send({success:true ,message:"User Delete Successfully"})
  } catch (error) {
    reply.send(error)
  }
  reply.send("delete Request")

})







// const Port = process.env.PORT || 3000
   


// Run the server!
fastify.listen( {port :3000,host:'0.0.0.0'}, (err, address) => {
  if (err) {
    process.exit(1)
  }
   
})

process.on("unhandledRejection", (err) => {
  fastify.close(() => {
    process.exit(1);
  });
});