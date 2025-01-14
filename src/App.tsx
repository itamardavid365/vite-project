import "./App.css";
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Cards from "./components/Cards.js";
import { createContext, useEffect, useState } from "react";
import CardDetails from "./components/CardDetails.js";
import MyFav from "./components/MyFav.js";
import { jwtDecode } from "jwt-decode";
import MyCards from "./components/MyCards.js";
import CreateCard from "./components/CreateCard.js";
import SearchCard from "./components/SearchCard.js";
import { ToastContainer } from "react-toastify";
import About from "./components/About.js";
import Page404 from "./components/Page404.js";

export interface UserDetails {
  isLoggedIn: boolean,
  userToken: string | null,
}

export interface DecodedToken {
  _id: string,
  isBusiness: boolean,
  isAdmin: boolean,
  iat: number
}



export const SiteSettings = createContext<any>({});

function App() {


  const [searchValue, setSearchValue] = useState<string>("");
  const [decodedToken, setDecodedToken] = useState<DecodedToken>()
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<UserDetails>({
    isLoggedIn: false,
    userToken: null
  })


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
      setUserDetails({
        isLoggedIn: true,
        userToken: (sessionStorage.getItem("token") as string)
      });
      setDecodedToken(jwtDecode(sessionStorage.getItem("token") as string) as DecodedToken)

    }
  }, [loggedIn])








  return (
    <>
      <SiteSettings.Provider value={{ searchValue, setSearchValue, decodedToken, darkTheme, setDarkTheme, loggedIn, setLoggedIn, userDetails, setUserDetails }}>
        <ToastContainer />
        <div id="main" className="bg bg-light" data-bs-theme={darkTheme ? "dark" : "white"}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/cards/1" />} />
              <Route path="/cards" element={<Navigate to="/cards/1" />} />
              <Route path="/cards/:pageNum" element={<Cards />} />
              {loggedIn && decodedToken?.isAdmin || decodedToken?.isBusiness && <Route path="/my-cards" element={<MyCards />} />}
              {loggedIn && <Route path="/my-fav" element={<MyFav />} />}
              {loggedIn && decodedToken?.isAdmin || decodedToken?.isBusiness && <Route path="/create-card" element={<CreateCard />} />}
              {loggedIn && <Route path="/my-profile" element={<About />} />}
              <Route path="/card/:id" element={<CardDetails />} />
              <Route path="/card-search/:search" element={<SearchCard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Page404 />} />
            </Routes>
          </Router>
        </div>
      </SiteSettings.Provider>

    </>
  )
}

export default App
