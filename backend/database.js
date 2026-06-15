import mongoose, { disconnect } from "mongoose";

mongoose.connect("mongodb://localhost:27017/HospitalRosales")

const connection = mongoose.Connection

connection.on("open", () =>{
    console.log("base conectada")
})

connection.on( disconnect , () =>{
    console.log("base desconectada")
})

connection.on("error", (error) =>{
    console.log("Error en la conexion a la base")
});