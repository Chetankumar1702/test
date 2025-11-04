import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function AllUsers() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        axios.get(`http://127.0.0.1:5000/api/showallusers?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setUsers(res.data.users);
                setPagination(res.data.pagination);
            })
            .catch((err) => {
                const msg = err.response?.data?.message || "Failed to load users.";
                setError(msg);

                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => setLoading(false));
    }, [page, navigate]);

    if (loading) return <div className="container text-center mt-5">Loading users…</div>;
    if (error) return <div className="container"><div className="alert alert-danger mt-5">{error}</div></div>;

    if (!users.length) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-info">No users found.</div>
                <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">👥 All Registered Users</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>User ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Roles</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile_no || "-"}</td>
                                <td>
                                    {user.roles?.length > 0 ? (
                                        user.roles.map((role, index) => (
                                            <span key={index} className="badge bg-primary me-1">
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-muted">No Role</span>
                                    )}
                                </td>
                                <td>{user.created_at ? user.created_at.split(" ")[0] : "-"}</td>
                                <td>
                                    <span className={`badge ${user.is_active ? "bg-success" : "bg-secondary"}`}>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <nav aria-label="User pagination">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${!pagination.has_prev && "disabled"}`}>
                        <Link className="page-link" to={`?page=${page - 1}`}>Previous</Link>
                    </li>

                    {[...Array(pagination.total_pages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <li key={pageNum} className={`page-item ${pageNum === pagination.current_page ? "active" : ""}`}>
                                <Link className="page-link" to={`?page=${pageNum}`}>{pageNum}</Link>
                            </li>
                        );
                    })}

                    <li className={`page-item ${!pagination.has_next && "disabled"}`}>
                        <Link className="page-link" to={`?page=${page + 1}`}>Next</Link>
                    </li>
                </ul>
            </nav>

            <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
        </div>
    );
}