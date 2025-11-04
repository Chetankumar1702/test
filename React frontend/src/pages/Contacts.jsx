import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Contacts = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        mobile_no: "",
        address: "",
        rating: "",
        message: "",
    });

    const [alert, setAlert] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:5000/api/contacts",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            setAlert({ type: "success", message: res.data.message || "Message sent successfully!" });

            setFormData({
                fullname: "",
                email: "",
                mobile_no: "",
                address: "",
                rating: "",
                message: "",
            });
        } catch (err) {
            const msg = err.response?.data?.message || "Message sending failed!";
            setAlert({ type: "danger", message: msg });
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar bg-primary navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DPCMS</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/contacts">Contacts</Link>
                            </li>
                        </ul>
                        <Link to="/login" className="btn btn-outline-light">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Contact Section */}
            <div id="contact" className="container py-5">
                <h2 className="mb-4 text-center">Get In Touch</h2>

                {/* Alert Box */}
                {alert.message && (
                    <div className={`alert alert-${alert.type} text-center`} role="alert">
                        {alert.message}
                    </div>
                )}

                <div className="row align-items-center mb-5">
                    <div className="col-md-5 text-center mb-4 mb-md-0">
                        <img
                            src="/images/img1.jpeg"
                            alt="Contact Animation"
                            className="img-fluid rounded shadow"
                        />
                    </div>

                    <div className="col-md-7">
                        <p>
                            Whether you want to contact me, start a project, have business inquiries, or just want to say hi,
                            my inbox is always open. I will get back to you as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" name="fullname" className="form-control" placeholder="Your Name"
                                    required value={formData.fullname} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <input type="email" name="email" className="form-control" placeholder="Your Email"
                                    required value={formData.email} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <input type="text" name="mobile_no" className="form-control" placeholder="Your Mobile Number"
                                    required value={formData.mobile_no} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <input type="text" name="address" className="form-control" placeholder="Your Address (optional)"
                                    value={formData.address} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <select className="form-control" name="rating" value={formData.rating} onChange={handleChange}>
                                    <option value="">Rate Us (optional)</option>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <textarea className="form-control" name="message" rows="6" placeholder="Your Message"
                                    required value={formData.message} onChange={handleChange}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary px-4">Submit</button>
                        </form>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8">
                        <div className="mb-2"><i className="fa-solid fa-paper-plane me-2"></i> akash581999@gmail.com</div>
                        <div className="mb-2"><i className="fa-solid fa-square-phone me-2"></i> 9634708314</div>
                        <div className="mb-2">
                            <a href="https://www.linkedin.com/in/akash-kumar-a40b98126/" target="_blank" rel="noreferrer"
                                className="text-decoration-none text-dark">
                                <i className="fa-brands fa-linkedin me-2"></i> linkedin.com/in/akash-kumar
                            </a>
                        </div>
                        <div className="mb-2">
                            <a href="https://github.com/Akash581999" target="_blank" rel="noreferrer"
                                className="text-decoration-none text-dark">
                                <i className="fa-brands fa-github me-2"></i> github.com/Akash581999
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
