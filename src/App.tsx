import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter></BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
