import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import {Route,Routes,BrowserRouter} from 'react-router'
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

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
  return <>
  
  </>
}

export default App;
