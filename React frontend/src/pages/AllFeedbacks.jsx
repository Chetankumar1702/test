import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllFeedbacks() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchContacts = async (page = 1) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");

            const res = await axios.get(`http://127.0.0.1:5000/api/showallfeedbacks?page=${page}&per_page=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setContacts(res.data.contacts);
            setPagination(res.data.pagination);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to load feedbacks";
            setError(msg);

            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts(1);
    }, []);

    const handlePageChange = (page) => {
        if (page && page !== pagination.current_page) fetchContacts(page);
    };

    if (loading) return <div className="container text-center mt-5">Loading feedbacks…</div>;
    if (error) return <div className="container"><div className="alert alert-danger mt-5">{error}</div></div>;

    return (
        <div className="container mt-5">
            <h2>All Contact Feedbacks</h2>

            {contacts.length ? (
                <>
                    <table className="table table-bordered table-hover mt-4">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Message</th>
                                <th>Rating</th>
                                <th>Sent On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.fullname || "-"}</td>
                                    <td>{c.email || "-"}</td>
                                    <td>{c.mobile_no || "-"}</td>
                                    <td>{c.message || "-"}</td>
                                    <td>{c.rating || "-"}</td>
                                    <td>{c.sent_on ? c.sent_on.substring(0, 16).replace("T", " ") : "-"}</td>
                                    <td>
                                        {c.read_status === "Read" ? (
                                            <span className="badge bg-success">Read</span>
                                        ) : c.read_status === "Unread" ? (
                                            <span className="badge bg-secondary">Unread</span>
                                        ) : (
                                            <span className="badge bg-warning">Unknown</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <nav aria-label="Contacts pagination">
                        <ul className="pagination justify-content-center mt-4">
                            <li className={`page-item ${!pagination.has_prev && "disabled"}`}>
                                <button className="page-link"
                                        onClick={() => handlePageChange(pagination.prev_page)}>
                                    Previous
                                </button>
                            </li>

                            {[...Array(pagination.total_pages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <li key={pageNum} className={`page-item ${pageNum === pagination.current_page && "active"}`}>
                                        <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                                            {pageNum}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${!pagination.has_next && "disabled"}`}>
                                <button className="page-link"
                                        onClick={() => handlePageChange(pagination.next_page)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <p>No contact messages yet.</p>
            )}

            <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
        </div>
    );
}
