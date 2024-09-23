import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./lib/PrivateRoute";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import DetailPage from "./pages/DetailPage";
import AddEvent from "./pages/AddEvent";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/addevent" element={<AddEvent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
