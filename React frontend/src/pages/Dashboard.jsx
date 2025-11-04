import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [stats, setStats] = useState({});

    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/dashboard", {
                withCredentials: true,   // ✅ send cookie to backend
            })
            .then((res) => {
                setUser(res.data.user);
                setStats(res.data.stats);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    return navigate("/login");
                }
                setError(err.response?.data?.message || err.message);
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/api/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout failed", err);
        }
        navigate("/login");
    };

    if (loading) return <Center>Loading dashboard…</Center>;
    if (error) return <Alert>{error}</Alert>;

    const isAdmin = user?.primary_role?.toLowerCase() === "admin";

    return (
        <div>
            {/* Nav */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    <span className="navbar-brand">DPCMS</span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/changepassword">Change Password</Link>
                            </li>
                        </ul>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogout} // ✅ logout hits backend
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mt-4 pt-3">
                <div className="text-center">
                    <h2>Welcome, {user.fullname}</h2>
                    <p className="text-muted">{user.email}</p>
                    <hr />
                </div>

                {isAdmin ? <AdminSection stats={stats} /> : <UserSection role={user.primary_role} />}
            </div>
        </div>
    );
}

const Center = ({ children }) => (
    <div className="container mt-5 text-center">{children}</div>
);

const Alert = ({ children }) => (
    <div className="container mt-5">
        <div className="alert alert-danger text-center">{children}</div>
    </div>
);

function AdminSection({ stats }) {
    const items = [
        ["👥 Users", stats.total_users, "/allusers", "primary"],
        ["📝 Consents", stats.total_consents, "/allconsents", "success"],
        ["💬 Feedbacks", stats.total_feedbacks, "/allfeedbacks", "warning"],
        ["⚖️ Fiduciaries", stats.total_fiduciaries, "/allfiduciaries", "danger"],
    ];

    return (
        <>
            <div className="text-center mt-4">
                <h3 className="text-primary">Admin Dashboard</h3>
                <p>Manage users, companies, and consent data.</p>
            </div>

            <div className="row text-center mt-4">
                {items.map(([title, value, link, color], i) => (
                    <div className="col-md-3 mb-3" key={i}>
                        <div className={`card bg-${color} text-white`}>
                            <div className="card-body text-center">
                                <h5>{title}</h5>
                                <h2>{value || 0}</h2>
                                <a href={link} className="btn btn-light btn-sm mt-2">
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function UserSection({ role }) {
    const roleName = role?.charAt(0).toUpperCase() + role?.slice(1);

    const actions = [
        ["Manage Consent", "/consent/status", "primary"],
        ["My Consents", "/myconsents", "success"],
        ["My Grievances", "/mygrievances", "warning"],
        ["My Notifications", "/notifications", "info"],
    ];

    return (
        <div className="text-center mt-4">
            <h3 className="text-success">{roleName} Dashboard</h3>
            <p>Welcome to your personalized DPCMS dashboard.</p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {actions.map(([text, link, color], i) => (
                    <Link key={i} to={link} className={`btn btn-${color}`}>
                        {text}
                    </Link>
                ))}
            </div>
        </div>
    );
}