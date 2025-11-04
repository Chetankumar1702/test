import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const About = () => {
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
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacts">Contacts</Link>
                            </li>
                        </ul>
                        <Link to="/login" className="btn btn-outline-light">Login</Link>
                    </div>
                </div>
            </nav>

            {/* About Section */}
            <div id="about" className="container py-5">
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-7 mb-4 mb-lg-0">
                        <div className="about__content">
                            <h2 className="about__title mb-3">Who Am I?</h2>
                            <p className="about__desc">
                                Committed and goal-oriented <Link to="#">Computer Science</Link> graduate looking
                                to pursue a career in the Fullstack web developer domain. Possess
                                excellent knowledge of web technologies. Ability to learn things quickly
                                and capable of working in a fast-paced and team-driven environment.
                            </p>
                            <p className="about__desc">
                                My journey as a <strong>web developer</strong> is fueled by a desire
                                to continuously learn, innovate, and elevate my craft. While I have
                                accomplished significant feats in just a year or two, my sights are
                                set on becoming a recognized expert in the IT sector. I am committed
                                to staying ahead of trends, refining my skills, and contributing to
                                the advancement of <strong>web development</strong>.
                            </p>

                            <hr className="about__hr my-4" />

                            {/* Skills & Tools */}
                            <div className="row about__skillTool">
                                <div className="col-md-6 mb-3">
                                    <div className="skill__container">
                                        <h3 className="about__subtitle h5 mb-2">SKILLS</h3>
                                        <ul className="about__ul list-group list-group-flush">
                                            {[
                                                "HTML5",
                                                "CSS3",
                                                "JAVASCRIPT (ES6+)",
                                                "BOOTSTRAP",
                                                "TAILWIND",
                                                "REACT JS",
                                                ".NET Core",
                                                "Python",
                                                "SQL"
                                            ].map((skill, index) => (
                                                <li key={index} className="about__list list-group-item">{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="skill__container">
                                        <h3 className="about__subtitle h5 mb-2">TOOLS</h3>
                                        <ul className="about__ul list-group list-group-flush">
                                            {[
                                                "VSCODE",
                                                "GITHUB",
                                                "Flask",
                                                "Postman",
                                                "JIRA",
                                                "SVN",
                                                "MYSQL",
                                                "POSTGRES"
                                            ].map((tool, index) => (
                                                <li key={index} className="about__list list-group-item">{tool}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-5 text-center">
                        <img
                            src="/images/img2.jpeg"
                            alt="Development Animation"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
