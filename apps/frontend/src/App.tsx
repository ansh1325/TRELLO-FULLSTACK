import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import {Route,Routes,BrowserRouter, useParams} from 'react-router'
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { useEffect, useState } from "react";

export function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/board/:boardId" element={<Board/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

function Board(){

  const boardId=useParams()

  const [users,setusers]=useState([])

  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:3002")

    ws.onmessage=(ev)=>{

      const data=JSON.parse(ev.data)

      if (data.type==="initial_state"){
        setusers(data.users)
        
      }

      if(data.type==='join'){
        setusers(u=>[...u,{id:data.userId}])

      }

      if(data.type==='leave'){
        setusers(u=>u.filter(x=>x.id!=data.userId))
      }
    }
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"Join",
        boardId:boardId
      }))
    }
  },[])

  return <>

  You are on board{boardId}

  current users:{JSON.stringify(users)}

  </>
}

export default App;
