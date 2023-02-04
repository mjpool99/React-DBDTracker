import { Link } from "react-router-dom";
import "../../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/LogoBeta.svg";

const SignUp = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match.")
        }
        try {
            setError("")
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
            setMessage("Account created!")
        } catch (error) {
            setError("Account creation failed.")
        }
        setLoading(false)
    }

    return (
        <div className="dbd-login">
            <img src={logo} alt="Logo"/>
            <form className="myCustomCard-login" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <br />
                {error && <span>{error}</span>}
                {message && <span>{message}</span>}
                <input type="text" ref={usernameRef} placeholder="Username" required />
                <input type="email" ref={emailRef} placeholder="Email" required />
                <input type="password" ref={passwordRef} placeholder="Password" required />
                <input type="password" ref={confirmPasswordRef} placeholder="Confirm Password" required />
                <button disabled={loading} type="submit">Sign Up</button>
                <br />
                <span className="subLink">
                    <Link to={"/"}>Back to Sign In</Link>
                </span>
            </form>
        </div>
    )
}

export default SignUp;