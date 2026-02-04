// require("dotenv").config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dotenv.config({path: "./.env"})


connectDB()





/*
;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR: ". error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`)
        })
    } catch(error){
        console.error("Error :",error);
        throw error;
    };
    

})()

*/