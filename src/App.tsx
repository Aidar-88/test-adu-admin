import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "./hook/useTypedSelector";
import AdminPage from "./pages/adminPage/AdminPage";
import LoginPage from "./pages/authPage/LoginPage";
import Error from "./pages/Error";

function App() {
  // useEffect(() => {
  //   if (localStorage.getItem('access_token')) {
  //     checkAuth()
  //   }
  // }, [])
  const { isAuth } = useTypedSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? "/app" : "/auth"} />} />

        <Route
          path="/app/*"
          element={isAuth ? <AdminPage /> : <Navigate to="/" />}
        />
        <Route path="/auth" element={<LoginPage />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
