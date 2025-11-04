import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:5000/api/login",
                { email, password, remember },
                { withCredentials: true } // ✅ send & store cookie
            );

            // ✅ Do NOT store token anymore
            // Browser stores HttpOnly Cookie securely

            setAlert({ type: "success", message: res.data.message });

            // Optional: store user object (not token)
            sessionStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard");

        } catch (err) {
            const msg = err.response?.data?.message || "Login failed!";
            setAlert({ type: "danger", message: msg });
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DPCMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contact">Contacts</Link></li>
                        </ul>
                        <Link to="/login" className="btn btn-outline-light ms-auto">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Login Form */}
            <div className="container mt-5" style={{ maxWidth: "500px" }}>
                <h2 className="mb-4 text-center">Login</h2>

                {/* Alert Messages */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" onClick={() => setAlert({ message: "" })}></button>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <div className="mt-4 text-center">
                    <p>Forgot Password? <Link to="/resetpassword">Reset Now</Link></p>
                    <p>Don’t have an account? <Link to="/register">Register Now</Link></p>
                </div>
            </div>
        </>
    );
};

export default Login;