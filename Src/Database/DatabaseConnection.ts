import mongoose from "mongoose";


// Connect Mongodb Database
export const Connectdb = async () => {
  const databaseUri =  'mongodb+srv://Amitkumar:Amit123@cluster0.c7oz4qm.mongodb.net/fuelBuddy?retryWrites=true&w=majority';
 
    await mongoose.connect(databaseUri);
    console.log('data base connect succesfully')
  
 
 

 
};