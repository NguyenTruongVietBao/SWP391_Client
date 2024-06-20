import ManagerRouter from "./routes/ManagerRouter";
import StudentRouter from "./routes/StudentRouter";
import ContentManagerRouter from "./routes/ContentManagerRouter";
import ParentRouter from "./routes/ParentRouter";
import AdminRouter from "./routes/AdminRouter";
import { Link,Navigate,Route, Routes   } from "react-router-dom";
// import Error404 from "./components/Error404/Error404";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { toast } from "react-toastify";

function App() {

  const PrivateRoute =({children,role}) =>{
    const user = useSelector(selectUser);
    if(role !== user?.role) {
      toast.error("You don't have permission to access !!!")
      if(user?.role === "ADMIN"){
        return  <Navigate to={"/admin"} />
      }
      if(user?.role === "CONTENT_MANAGER"){
        return  <Navigate to={"/content-manager"} />
      }
      if(user?.role === "MANAGER"){
        return  <Navigate to={"/manager"} />
      } 
      if(user?.role === "PARENT"){
        return  <Navigate to={"/"} />
      }
    }
    else return children;
  }

  return (
    <div className="App">
      <ul className="flex gap-5 ">
        <li><Link to={"/admin"}>Admin</Link></li>
        <li><Link to={"/content-manager"}>Content Manager</Link></li>
        <li><Link to={"/manager"}>Manager</Link></li>
        <li><Link to={"/learning"}>Student</Link></li>
        <li><Link to={"/learning/login"}>Student login</Link></li>
        <li><Link to={"/"}>Home</Link></li>      
      </ul>
      <Routes>
        <Route path="/*" element={<ParentRouter/>}></Route>
        <Route path="/admin/*" element={
          <PrivateRoute role={"ADMIN"}>
            <AdminRouter/>
          </PrivateRoute>
        }>          
        </Route>
        <Route path="/content-manager/*" element={
          <PrivateRoute role={"CONTENT_MANAGER"}>
            <ContentManagerRouter/>
          </PrivateRoute>
        }>          
        </Route>
        <Route path="/manager/*" element={
          <PrivateRoute role={"MANAGER"}>
            <ManagerRouter/>
          </PrivateRoute>
        }>          
        </Route>
        {/* <Route path="/learning/*" element={
          <PrivateRoute role={"STUDENT"}>
            <StudentRouter/>
          </PrivateRoute>
        }>          
        </Route> */}
        <Route path="/learning/*" element={<StudentRouter/>}>          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
