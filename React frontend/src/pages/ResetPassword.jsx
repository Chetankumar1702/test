import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        new_password: "",
        confirm_password: ""
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

        if (formData.new_password !== formData.confirm_password) {
            setAlert({ type: "danger", message: "Passwords do not match!" });
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:5000/api/resetpassword", formData);

            setAlert({ type: "success", message: res.data.message || "Password reset successful!" });
            setFormData({ email: "", new_password: "", confirm_password: "" });
        } catch (err) {
            const msg = err.response?.data?.message || "Password reset failed!";
            setAlert({ type: "danger", message: msg });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-3">Reset Password</h2>

            {/* Alert */}
            {alert.message && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert({ message: "" })}></button>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Registered Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="new_password"
                        required
                        value={formData.new_password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirm_password"
                        required
                        value={formData.confirm_password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
            </form>

            <p className="mt-3">
                Already know your password? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default ResetPassword;
