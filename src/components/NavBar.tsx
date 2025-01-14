import { FunctionComponent, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteSettings } from "../App";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = () => {
    const { darkTheme, setDarkTheme, loggedIn, setLoggedIn, setUserDetails, setSearchValue } = useContext(SiteSettings)
    const navigate = useNavigate();
    const darkModeIcon = useRef<HTMLElement | null>(null);
    const handleDarkMode = () => {
        console.log("render");
        if (darkTheme) {
            darkModeIcon.current?.classList.remove("fa-solid");
            darkModeIcon.current?.classList.add("fa-regular");
        } else {
            darkModeIcon.current?.classList.remove("fa-regular");
            darkModeIcon.current?.classList.add("fa-solid");
        }
        setDarkTheme(!darkTheme);
    };
    useEffect(() => {
        console.log("use Effect render");


    }, [darkTheme, loggedIn])

    const handleLogOut = () => {
        setLoggedIn(false)
        sessionStorage.removeItem("token")
        setUserDetails({
            isLoggedIn: false,
            userToken: undefined
        })
        navigate("/")
    }

    const searchRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (searchRef.current?.value == "") return;
        setSearchValue(searchRef.current?.value);
        navigate(`/card-search/${searchRef.current?.value}`);
    }

    return (<>
        <nav className='navbar navbar-expand-lg bg-body-tertiary' data-bs-theme={darkTheme && "dark"}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Bcard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={"/"} className="nav-link active">Cards</NavLink>
                        </li>
                        {loggedIn && (<li className="nav-item">
                            <NavLink to={"/my-fav"} className="nav-link">My fav</NavLink>
                        </li>)}
                        {loggedIn &&
                            (<li className="nav-item">
                                <NavLink to={'/my-cards'} className="nav-link">My cards</NavLink>
                            </li>)}
                        {loggedIn &&
                            (<li className="nav-item">
                                <NavLink to={'/create-card'} className="nav-link">Create card</NavLink>
                            </li>)}
                        {loggedIn &&
                            (<li className="nav-item">
                                <NavLink to={'/my-profile'} className="nav-link">My profile</NavLink>
                            </li>)}
                    </ul>
                    <form className="d-flex justify-content-center align-content-center me-1 me-auto" role="search" onSubmit={onSubmit}>
                        <input ref={searchRef} className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success mx-1" type="submit">Search</button>
                    </form>
                    <div className="my-3 my-lg-0">
                        {loggedIn === true && sessionStorage.getItem("token") !== null ? (<>
                            <a onClick={() => {
                                handleLogOut()

                            }} className="btn btn-outline-danger me-1" type="submit">Log out</a>
                        </>) : (<>
                            <NavLink to={"/login"} className="btn btn-outline-success me-1" type="submit">Login</NavLink>
                            <NavLink to={"/register"} className="btn btn-outline-info me-1" type="submit" style={{}}>Sign up</NavLink>
                        </>)}

                    </div>
                    <div>
                        <i ref={darkModeIcon} className="fa-regular fa-moon fs-1 mx-3 text-bg-light rounded-circle w-75 h-100" onClick={handleDarkMode} />

                    </div>
                </div>
            </div>
        </nav >
    </>);
}

export default NavBar;