import "../../App.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { DBProvider } from "../../contexts/DBContext";
import logo from "../../assets/LogoBeta.svg";
import {
    useNavigate,
    Link,
    Outlet
} from "react-router-dom";
import { useState } from "react";

const Dashboard = (props) => {
    const [ user , setUser ] = useState(()=>{
        return props.userProfile
    });
    const navigate = useNavigate();
    const useSignOut = async () => {
        await signOut(auth)
        navigate("/");
    }
    return (
        <div className="dashboard">
            <nav>
                <div className="nav-container">
                    <img src={logo} alt="Logo"/>
                    <div className="nav-links">
                        <Link className="nav-link" to="/Dashboard">Survivor Tracker</Link>
                        <Link className="nav-link" to="/Dashboard/KillerTracker">Killer Tracker</Link>
                        <div className="dropdown">
                            Welcome, <a className="dropdown-toggle  profile-btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user?.displayName}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <a className="dropdown-item sign-out" href="#" onClick={useSignOut}>
                                        Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="main">
                <DBProvider context={[ user , setUser ]}>
                    <Outlet context={[ user , setUser ]} />
                </DBProvider>
            </div>
        </div>
    )
}

export default Dashboard;
