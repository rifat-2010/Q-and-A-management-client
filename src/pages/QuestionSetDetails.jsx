import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

const QuestionSetDetails = () => {
    const { id } = useParams();
    const [questionSet, setQuestionSet] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Form State
    const [type, setType] = useState("mcq");
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]); // 4 options by default for MCQ
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [required, setRequired] = useState(true);

    const fetchDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const setRes = await axios.get(`${API_BASE_URL}/question-sets/${id}`, config);
            const questionsRes = await axios.get(`${API_BASE_URL}/questions/set/${id}`, config);

            setQuestionSet(setRes.data);
            setQuestions(questionsRes.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch details");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            // Validation logic
            const payload = {
                questionSetId: id,
                type,
                questionText,
                required
            };

            if (type === "mcq") {
                payload.options = options.filter(o => o.trim() !== "");
                payload.correctAnswer = correctAnswer;
                if (payload.options.length < 2) {
                    alert("MCQ needs at least 2 options");
                    return;
                }
                if (!payload.options.includes(correctAnswer)) {
                    alert("Correct answer must be one of the options");
                    return;
                }
            } else if (type === "boolean") {
                payload.options = ["True", "False"];
                payload.correctAnswer = correctAnswer; // "True" or "False"
                if (!correctAnswer) {
                    alert("Select True or False");
                    return;
                }
            } else {
                // Descriptive - no options, maybe no auto-correct answer check
                payload.correctAnswer = "";
            }

            await axios.post(`${API_BASE_URL}/questions`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Reset form
            setQuestionText("");
            setOptions(["", "", "", ""]);
            setCorrectAnswer("");
            fetchDetails();
        } catch (err) {
            alert("Failed to add question");
            console.error(err);
        }
    };

    const handleDeleteQuestion = async (qId) => {
        if (!window.confirm("Delete question?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE_URL}/questions/${qId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchDetails();
        } catch (err) {
            alert("Delete failed");
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!questionSet) return <div>Question set not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="min-w-0 flex-1">
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                    {questionSet.title}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">{questionSet.description}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Left: Questions List */}
                            <div className="lg:col-span-2">
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Questions ({questions.length})</h3>
                                    <ul className="space-y-4">
                                        {questions.map((q, idx) => (
                                            <li key={q._id} className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-medium text-gray-900">
                                                            {idx + 1}. {q.questionText} <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 py-0.5 rounded ml-2">{q.type}</span>
                                                        </h4>
                                                        {q.type === 'mcq' && (
                                                            <ul className="mt-2 list-disc pl-5">
                                                                {q.options.map((opt, i) => (
                                                                    <li key={i} className={opt === q.correctAnswer ? "text-green-600 font-semibold" : "text-gray-500"}>
                                                                        {opt}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {q.type === 'boolean' && (
                                                            <p className="mt-2 text-sm text-gray-500">Correct: <span className="font-semibold text-green-600">{q.correctAnswer}</span></p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleDeleteQuestion(q._id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right: Add Question Form */}
                            <div className="lg:col-span-1">
                                <div className="mt-8 bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Add New Question</h3>
                                        <form onSubmit={handleAddQuestion} className="mt-5 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Question Type</label>
                                                <select
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="mcq">Multiple Choice</option>
                                                    <option value="boolean">True / False</option>
                                                    <option value="descriptive">Descriptive</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Question Text</label>
                                                <textarea
                                                    rows={3}
                                                    required
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={questionText}
                                                    onChange={(e) => setQuestionText(e.target.value)}
                                                />
                                            </div>

                                            {type === 'mcq' && (
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Options</label>
                                                    {options.map((opt, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                name="correctAnswer"
                                                                checked={correctAnswer === opt && opt !== ""}
                                                                onChange={() => setCorrectAnswer(opt)}
                                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                                disabled={opt === ""}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                placeholder={`Option ${idx + 1}`}
                                                                value={opt}
                                                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <p className="text-xs text-gray-500">Select the radio button to mark correct answer.</p>
                                                </div>
                                            )}

                                            {type === 'boolean' && (
                                                <div>
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">Correct Answer</label>
                                                    <div className="mt-2 flex items-center space-x-4">
                                                        <label className="flex items-center">
                                                            <input type="radio" value="True" checked={correctAnswer === "True"} onChange={(e) => setCorrectAnswer("True")} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600" />
                                                            <span className="ml-2 text-sm text-gray-900">True</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input type="radio" value="False" checked={correctAnswer === "False"} onChange={(e) => setCorrectAnswer("False")} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600" />
                                                            <span className="ml-2 text-sm text-gray-900">False</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="flex items-center space-x-2">
                                                    <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                    <span className="text-sm text-gray-900">Required?</span>
                                                </label>
                                            </div>

                                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Add Question
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default QuestionSetDetails;
