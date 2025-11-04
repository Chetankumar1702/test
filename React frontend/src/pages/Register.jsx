import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        mobile_no: "",
        address: ""
    });

    const [alert, setAlert] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://127.0.0.1:5000/api/register", formData);

            setAlert({ type: "success", message: res.data.message || "Registration successful!" });

            setTimeout(() => navigate("/login"), 600);
        } catch (err) {
            const msg = err.response?.data?.message || "Registration failed!";
            setAlert({ type: "danger", message: msg });
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar bg-primary navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DPCMS</Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contact">Contacts</Link></li>
                        </ul>
                        <Link to="/login" className="btn btn-outline-light">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Register Form */}
            <div className="container mt-5" style={{ maxWidth: "600px" }}>
                <h2 className="mb-4">Register</h2>

                {/* Alert Messages */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" onClick={() => setAlert({ message: "" })}></button>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="mobile_no"
                            value={formData.mobile_no}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10,15}"
                            title="Enter a valid mobile number (10-15 digits)"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Location</label>
                        <textarea
                            className="form-control"
                            name="address"
                            rows="1"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>

                <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
