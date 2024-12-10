import {Server} from "socket.io"
// Create HTTP server and attach Socket.IO
let io;

export const initSocket =(server)=>{
    io =new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true,
        }
    });

    io.on("connection",(socket)=>{
        console.log(`A client connected: ${socket.id}`)
        // // Listen for updates from the client
        socket.on("restaurantDataUpdated", (data) => {
            console.log("Received updated restaurant data:", data);

            // Broadcast the update to all clients
            io.emit("updateRestaurantData", data);
        });
        // Handle client disconnection
        socket.on("disconnect", () => {
            console.log(`A client disconnected: ${socket.id}`);
        });
    })
}
export const getIo =()=>{
    if(!io){
        throw new Error("Socket.io not initialized");
    }
    return io
}