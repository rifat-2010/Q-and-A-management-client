import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

const UserDashboard = () => {
    const [questionSets, setQuestionSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestionSets = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/question-sets`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQuestionSets(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchQuestionSets();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Available Tests
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="px-4 py-8 sm:px-0">
                            {loading ? <p>Loading...</p> : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {questionSets.map((set) => (
                                        <div key={set._id} className="overflow-hidden bg-white shadow rounded-lg">
                                            <div className="px-4 py-5 sm:p-6">
                                                <div className="flex items-center">
                                                    <div className="w-0 flex-1">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900 group-hover:text-gray-600">
                                                            {set.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {set.description || "No description"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                                <Link
                                                    to={`/tests/${set._id}`}
                                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Take Test
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
