import Navbar from "../components/Navbar";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                            Admin Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="px-4 py-8 sm:px-0">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Dashboard implementation ideas: Quick Stats */}
                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {/* Icon can go here */}
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="truncate text-sm font-medium text-gray-500">
                                                        Manage Content
                                                    </dt>
                                                    <dd>
                                                        <div className="text-lg font-medium text-gray-900">
                                                            Question Sets
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3">
                                        <div className="text-sm">
                                            <a href="/admin/question-sets" className="font-medium text-indigo-700 hover:text-indigo-900">
                                                View all
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden rounded-lg bg-white shadow">
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt className="truncate text-sm font-medium text-gray-500">
                                                        Student Performance
                                                    </dt>
                                                    <dd>
                                                        <div className="text-lg font-medium text-gray-900">
                                                            View Responses
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3">
                                        <div className="text-sm">
                                            <a href="/admin/responses" className="font-medium text-indigo-700 hover:text-indigo-900">
                                                View submissions
                                            </a>
                                        </div>
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

export default AdminDashboard;
