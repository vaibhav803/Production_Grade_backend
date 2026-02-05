// require("dotenv").config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import dns from "node:dns/promises";
import { error } from "node:console";
dns.setServers(["1.1.1.1"]);

dotenv.config({path: "./.env"})


connectDB()
.then(() => {
    app.on("error",(error) => {
        console.error("Error:",error)
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port :${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("Mongo db connection failed !!!",error)
})





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