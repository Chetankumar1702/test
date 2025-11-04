import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllFiduciaries() {
    const navigate = useNavigate();
    const [fiduciaries, setFiduciaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({ name: "", contact_email: "" });

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return navigate("/login");
        loadFiduciaries();// eslint-disable-next-line 
    }, []);

    const loadFiduciaries = () => {
        setLoading(true);

        axios.get("http://127.0.0.1:5000/api/showallfiduciaries", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setFiduciaries(res.data.fiduciaries))
            .catch(err => {
                const msg = err.response?.data?.message || "Failed to load fiduciaries.";
                setError(msg);

                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => setLoading(false));
    };

    const handleAdd = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:5000/api/fiduciaries/add", form, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setForm({ name: "", contact_email: "" });
                loadFiduciaries();
            })
            .catch(err => alert(err.response?.data?.message || "Failed to add fiduciary"));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this fiduciary?")) return;

        axios.delete(`http://127.0.0.1:5000/api/fiduciaries/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => loadFiduciaries())
            .catch(err => alert("Delete failed"));
    };

    if (loading) return <div className="container text-center mt-5">Loading...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">📌 Data Fiduciaries</h2>

            {/* Add Form */}
            <form className="row g-3 mb-4" onSubmit={handleAdd}>
                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Fiduciary Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-5">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Contact Email"
                        value={form.contact_email}
                        onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" type="submit">Add</button>
                </div>
            </form>

            {/* Table */}
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created On</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fiduciaries.length > 0 ? fiduciaries.map(fid => (
                        <tr key={fid.id}>
                            <td>{fid.id}</td>
                            <td>{fid.name}</td>
                            <td>{fid.contact_email}</td>
                            <td>{fid.created_at?.split(" ")[0]}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(fid.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className="text-center">No fiduciaries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/dashboard" className="btn btn-primary mt-3">Back</Link>
        </div>
    );
}