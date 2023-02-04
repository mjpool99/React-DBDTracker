import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../../App.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/LogoBeta.svg";

const SignIn = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("")
            setMessage("")
            await forgotPassword(emailRef.current.value)
            setMessage("Check your email for further instructions.")
            setLoading(true)
        } catch (error) {
            setError("Failed to send reset email.");
        }
    }

    return (
        <div className="dbd-login">
            <img src={logo} alt="Logo"/>
            <form className="myCustomCard-login" onSubmit={handleSubmit}>
                <h1>Forgot Password?</h1>
                <br />
                {error && <span>{error}</span>}
                {message && <span>{message}</span>}
                <input type="email" name="email" ref={emailRef} placeholder="Email" />
                <button disabled={loading} type="submit">Sign In</button>
                <br />
                <span className="subLink">
                <Link to={"/"}>Back to Sign In.</Link>
                </span>
                <span className="subLink">Need an account? <Link to={"/SignUp"}>Sign Up!</Link></span>
            </form>
        </div>
    )
}

export default SignIn;