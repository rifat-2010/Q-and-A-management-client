import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

const ResponseDetails = () => {
    const { id } = useParams();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/responses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResponse(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchResponse();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!response) return <div>Response not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Response Details
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Student: <span className="font-semibold">{response.userId?.name}</span> |
                            Test: <span className="font-semibold">{response.questionSetId?.title}</span>
                        </p>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Submitted Answers</h3>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    {response.answers.map((ans, idx) => {
                                        const question = ans.questionId;
                                        const isCorrect = question.correctAnswer && ans.answer === question.correctAnswer;
                                        const hasCorrectAnswer = !!question.correctAnswer;

                                        return (
                                            <div key={idx} className={idx % 2 === 0 ? "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" : "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"}>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Q{idx + 1}: {question.questionText}
                                                    <span className="block text-xs uppercase text-gray-400 mt-1">{question.type}</span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <p className="font-medium">Answer: {ans.answer}</p>

                                                    {hasCorrectAnswer && (
                                                        <div className="mt-2 text-sm">
                                                            {isCorrect ? (
                                                                <span className="text-green-600 font-semibold">✓ Correct</span>
                                                            ) : (
                                                                <span className="text-red-600 font-semibold">
                                                                    ✗ Incorrect (Correct: {question.correctAnswer})
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </dd>
                                            </div>
                                        );
                                    })}
                                </dl>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ResponseDetails;
