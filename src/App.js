import ManagerRouter from "./routes/ManagerRouter";
import StudentRouter from "./routes/StudentRouter";
import ContentManagerRouter from "./routes/ContentManagerRouter";
import ParentRouter from "./routes/ParentRouter";
import AdminRouter from "./routes/AdminRouter";
import { Link,Navigate,Route, Routes, useNavigate   } from "react-router-dom";
// import Error404 from "./components/Error404/Error404";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { toast } from "react-toastify";
import Login from "./pages/Login/Login";
import LoginStudent from "./pages/Login/LoginStudent";
import Register from "./pages/Login/Register";

function App() {

  const PrivateRoute = ({ children, role }) => {
    const user = useSelector(selectUser);
     if (role !== user?.role) {
      toast.error("You don't have permission to access !!!");
      switch (user?.role) {
        case 'ADMIN':
          return <Navigate to="/admin" />;
        case 'CONTENT_MANAGER':
          return <Navigate to="/content-manager" />;
        case 'MANAGER':
          return <Navigate to="/manager" />;
        case 'PARENT':
          return <Navigate to="/" />;
        case 'STUDENT':
          return <Navigate to="/learning" />;
        default:
          return <Navigate to="/" />;
      }
    } else {
      return children;
    }
  };

  const PublicRoute = ({ children }) => {
    const user = useSelector(selectUser);
    if (user) {
      switch (user.role) {
        case 'ADMIN':
          return <Navigate to="/admin" />;
        case 'CONTENT_MANAGER':
          return <Navigate to="/content-manager" />;
        case 'MANAGER':
          return <Navigate to="/manager" />;
        case 'PARENT':
          return <Navigate to="/" />;
        case 'STUDENT':
          return <Navigate to="/learning" />;
        default:
          return <Navigate to="/" />;
      }
    } else {
      return children;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<ParentRouter/>}/>
        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}/>
        <Route path="/register" element={<PublicRoute> <Register/> </PublicRoute>}/>
        <Route path="/learning/login" element={<PublicRoute> <LoginStudent /> </PublicRoute>}/>
        
        <Route path="/admin/*"
          element={
            <PrivateRoute role="ADMIN">
              <AdminRouter />
            </PrivateRoute>
          }
        />
        <Route path="/content-manager/*"
          element={
            <PrivateRoute role="CONTENT_MANAGER">
              <ContentManagerRouter />
            </PrivateRoute>
          }
        />
        <Route path="/manager/*"
          element={
            <PrivateRoute role="MANAGER">
              <ManagerRouter />
            </PrivateRoute>
          }
        />
        <Route path="/learning/*"
          element={
            <PrivateRoute role="STUDENT">
              <StudentRouter />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
export default App;