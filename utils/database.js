import mongoose from "mongoose";

let isConnnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(isConnnected){
        console.log("MongDB is Online !");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnnected = true;

        console.log("MongoDB Connected")


    } catch (error) {
        console.log(error);
    }

}