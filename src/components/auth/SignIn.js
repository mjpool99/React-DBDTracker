import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "../../App.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/LogoBeta.svg";

const SignIn = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            return navigate("/Dashboard")
        } catch (error) {
            setError("Email or password is incorrect.");
        }
        setLoading(false)
    }

    return (
        <div className="dbd-login">
            <img src={logo} alt="Logo"/>
            <form className="myCustomCard-login" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <br />
                {error && <span>{error}</span>}
                <input type="email" name="email" ref={emailRef} placeholder="Email" />
                <input type="password" name="password" ref={passwordRef} placeholder="Password" />
                <button disabled={loading} type="submit">Sign In</button>
                <br />
                <span className="subLink">Forgot your password? <Link to={"/ForgotPassword"}>Reset</Link></span>
                <span className="subLink">Need an account? <Link to={"/SignUp"}>Sign Up!</Link></span>
            </form>
        </div>
    )
}

export default SignIn;