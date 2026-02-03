import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SubmissionSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <h2 className="text-3xl font-extrabold text-green-600 mb-4">Success!</h2>
                        <p className="text-gray-700 mb-6">Your response has been submitted successfully.</p>
                        <Link to="/tests" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Back to Available Tests
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionSuccess;
