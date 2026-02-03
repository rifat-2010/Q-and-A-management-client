import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

const TestPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // { questionId: answer }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/questions/set/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setQuestions(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load questions");
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [id]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check required questions
        for (const q of questions) {
            if (q.required && !answers[q._id]) {
                alert(`Please answer the required question: "${q.questionText}"`);
                return;
            }
        }

        try {
            const token = localStorage.getItem("token");
            const formattedAnswers = Object.keys(answers).map(qId => ({
                questionId: qId,
                answer: answers[qId]
            }));

            await axios.post(
                `${API_BASE_URL}/responses`,
                {
                    questionSetId: id,
                    answers: formattedAnswers,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate("/submission-success");
        } catch (err) {
            alert("Submission failed");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {questions.map((q, idx) => (
                                <div key={q._id} className="bg-white shadow sm:rounded-lg overflow-hidden">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {idx + 1}. {q.questionText} {q.required && <span className="text-red-500">*</span>}
                                        </h3>
                                        <div className="mt-4">
                                            {q.type === 'mcq' && (
                                                <div className="space-y-2">
                                                    {q.options.map((opt, i) => (
                                                        <div key={i} className="flex items-center">
                                                            <input
                                                                id={`${q._id}-${i}`}
                                                                name={q._id}
                                                                type="radio"
                                                                value={opt}
                                                                checked={answers[q._id] === opt}
                                                                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <label htmlFor={`${q._id}-${i}`} className="ml-3 block text-sm font-medium text-gray-700">
                                                                {opt}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {q.type === 'boolean' && (
                                                <div className="space-y-2">
                                                    {['True', 'False'].map((opt, i) => (
                                                        <div key={i} className="flex items-center">
                                                            <input
                                                                id={`${q._id}-${i}`}
                                                                name={q._id}
                                                                type="radio"
                                                                value={opt}
                                                                checked={answers[q._id] === opt}
                                                                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            />
                                                            <label htmlFor={`${q._id}-${i}`} className="ml-3 block text-sm font-medium text-gray-700">
                                                                {opt}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {q.type === 'descriptive' && (
                                                <textarea
                                                    rows={3}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={answers[q._id] || ""}
                                                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit Response
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestPage;
