import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllConsents() {
    const navigate = useNavigate();
    const [consents, setConsents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        axios.get("http://127.0.0.1:5000/api/showallconsents", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setConsents(res.data.consents || []);
            })
            .catch((err) => {
                const msg = err.response?.data?.message || "Failed to load consents.";
                setError(msg);

                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <div className="container text-center mt-5">Loading consents…</div>;
    if (error) return <div className="container"><div className="alert alert-danger mt-5">{error}</div></div>;

    if (!consents.length) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-info">No consents found.</div>
                <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">📜 All Consents</h2>

            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Consent ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Purpose/Form</th>
                        <th>Status</th>
                        <th>Method</th>
                        <th>Consent Date</th>
                        <th>Expire On</th>
                    </tr>
                </thead>
                <tbody>
                    {consents.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.fullname}</td>
                            <td>{c.email}</td>
                            <td>
                                {c.form_id
                                    ? `External Form #${c.form_id}`
                                    : `Purpose ID: ${c.purpose_id ?? "-"}`}
                            </td>
                            <td>{c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : "-"}</td>
                            <td>{c.method || "Form"}</td>
                            <td>{c.timestamp ? c.timestamp.split("T")[0] : "-"}</td>
                            <td>{c.expiry_date ? c.expiry_date.split("T")[0] : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
        </div>
    );
}