import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaUserTie, FaUserGraduate, FaUserShield } from "react-icons/fa";

const Home = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Navbar */}
            <nav className="navbar bg-primary navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DPCMS</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacts">Contacts</Link>
                            </li>
                        </ul>
                        <Link to="/login" className="btn btn-outline-light">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <header className="bg-light py-5">
                <div className="container text-center">
                    <h1 className="display-4 mb-3">Welcome to the Seeker Job Portal</h1>
                    <p className="lead mb-4">
                        A Python Flask project using React + Bootstrap for frontend and PostgreSQL on backend.
                        <br />
                        This portal connects <strong>Recruiters</strong> and <strong>Job Seekers</strong>, with an{" "}
                        <strong>Admin</strong> monitoring all activities.
                    </p>
                    <Link to="/register" className="btn btn-primary btn-lg me-2">
                        Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg">
                        Browse Jobs
                    </Link>
                </div>
            </header>

            {/* Feature Cards */}
            <section className="container py-5">
                <div className="row text-center" style={{ minHeight: "300px" }}>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <FaUserTie className="fa-2x mb-3 text-primary" />
                                <h5 className="card-title">For Recruiters</h5>
                                <p className="card-text">
                                    Post jobs, manage applications, and find the best candidates for your company.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <FaUserGraduate className="fa-2x mb-3 text-success" />
                                <h5 className="card-title">For Job Seekers</h5>
                                <p className="card-text">
                                    Search and apply for jobs, manage your profile, and track your applications easily.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <FaUserShield className="fa-2x mb-3 text-warning" />
                                <h5 className="card-title">For Admin</h5>
                                <p className="card-text">
                                    Monitor all activities, manage users and jobs, and ensure smooth portal operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                © {currentYear} Seeker Job Portal. All rights reserved.
            </footer>
        </>
    );
};

export default Home;
