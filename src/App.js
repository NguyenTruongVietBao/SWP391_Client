import ManagerRouter from "./routes/ManagerRouter";
import StudentRouter from "./routes/StudentRouter";
import ContentManagerRouter from "./routes/ContentManagerRouter";
import ParentRouter from "./routes/ParentRouter";
import AdminRouter from "./routes/AdminRouter";
import { Link,Route, Routes   } from "react-router-dom";
import Error404 from "./components/Error404/Error404";
import AdminTable from "./components/Admin/AdminTable";

function App() {
  return (
    <div className="App">
      <ul className="flex gap-5 ">
        <li><Link to={"/admin"}>Admin</Link></li>
        <li><Link to={"/content-manager"}>Content Manager</Link></li>
        <li><Link to={"/manager"}>Manager</Link></li>
        <li><Link to={"/student"}>Student</Link></li>
        <li><Link to={"/"}>Home</Link></li>      
        <li><Link to={"/login"}>Login</Link></li>      
      </ul>
      <Routes>
        <Route path="/*" element={<ParentRouter/>}></Route>
        <Route path="/admin" element={<AdminRouter/>}></Route>
        <Route path="/content-manager" element={<ContentManagerRouter/>}></Route>
        <Route path="/manager" element={<ManagerRouter/>}></Route>
        <Route path="/student" element={<StudentRouter/>}></Route>
        <Route path="/123123" element={<AdminTable/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
