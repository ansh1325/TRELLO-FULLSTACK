console.log("Hello via Bun!");

import {prisma} from "db/client"

import { WebSocketServer } from "ws";

const  server=new WebSocketServer({port:3002})

const ROOMS:any={

}

server.on("connection",(socket)=>{
    socket.on("message",(data)=>{
        const parsedData=JSON.parse(data)
        if(parsedData.type==='join'){
            const boardId=parsedData.boardId
            if(!ROOMS[boardId]){
                ROOMS[boardId]=[]
            }
            const newUserId=Math.random();
            for(let i=0;i<ROOMS[boardId].length;i++){
                const user=ROOMS[boardId][i]
                user.socket.send(JSON.stringify({
                    type:"join",
                    userId:newUserId
                }))
            }
            
            ROOMS[boardId].push({userId:newUserId,socket:socket})

            
            socket.send(JSON.stringify({
                type:"initial_state",
                users:ROOMS.filter(u=>u.id!=newUserId).map(x=>x.id)
            }))
        }
    })

    socket.on("close",()=>{

        Object.entries(ROOMS).map(([roomId,users])=>{
            const userExists=users.find(u=>u.socket==socket)
            if(userExists){
                users=users.filter(x=>x.socket==socket)
                users.foreach(({socket})=>socket.send(JSON.stringify({
                    type:"leave",
                    userId:userExists.id
                })))
            }
        })
    }
    )

})