import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

const QuestionSets = () => {
    const [questionSets, setQuestionSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const fetchQuestionSets = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/question-sets`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuestionSets(res.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch question sets");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestionSets();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${API_BASE_URL}/question-sets`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTitle("");
            setDescription("");
            fetchQuestionSets(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create question set");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE_URL}/question-sets/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchQuestionSets();
        } catch (err) {
            alert("Failed to delete");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Question Sets
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                        {/* Create Form */}
                        <div className="mt-8 bg-white p-6 shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Question Set</h3>
                            {error && <p className="text-red-500">{error}</p>}
                            <form onSubmit={handleCreate} className="mt-5 sm:flex sm:items-center">
                                <div className="w-full sm:max-w-xs">
                                    <label htmlFor="title" className="sr-only">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="w-full sm:max-w-xs sm:ml-3 mt-3 sm:mt-0">
                                    <label htmlFor="description" className="sr-only">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                                >
                                    Create
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="mt-8">
                            {loading ? <p>Loading...</p> : (
                                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {questionSets.map((set) => (
                                            <li key={set._id}>
                                                <div className="flex items-center px-4 py-4 sm:px-6">
                                                    <div className="flex min-w-0 flex-1 items-center">
                                                        <div>
                                                            <p className="truncate text-sm font-medium text-indigo-600">{set.title}</p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                {set.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <Link
                                                            to={`/admin/question-sets/${set._id}`}
                                                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            Manage Questions
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(set._id)}
                                                            className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        {questionSets.length === 0 && <li className="px-4 py-4 sm:px-6 text-gray-500">No question sets found.</li>}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default QuestionSets;
