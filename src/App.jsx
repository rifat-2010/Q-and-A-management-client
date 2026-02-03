import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import QuestionSets from "./pages/QuestionSets";
import QuestionSetDetails from "./pages/QuestionSetDetails";
import UserDashboard from "./pages/UserDashboard";
import TestPage from "./pages/TestPage";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import AdminResponses from "./pages/AdminResponses";
import ResponseDetails from "./pages/ResponseDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/question-sets" element={<QuestionSets />} />
            <Route path="/admin/question-sets/:id" element={<QuestionSetDetails />} />
            <Route path="/admin/responses" element={<AdminResponses />} />
            <Route path="/admin/responses/:id" element={<ResponseDetails />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/tests" element={<UserDashboard />} />
            <Route path="/tests/:id" element={<TestPage />} />
            <Route path="/submission-success" element={<SubmissionSuccess />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
