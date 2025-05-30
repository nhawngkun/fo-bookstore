import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import BooksPage from "./Pages/BooksPage";
import HomePage from "./Pages/HomePage";
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./Context/Authprovider";
import ProfilePage from "./Pages/ProfilePage";
import ReadBook from "./Components/ReadBook";
import SearchResults from "./Components/SearchResults";

// Import các components Admin mới
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminUsers from './Components/Admin/AdminUsers';
import AdminBooks from './Components/Admin/AdminBooks';


export default function App() {
  const [auth] = useAuth()

  return (
    <>
      <div className="dark:bg-slate-900 dark-text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={auth ? <BooksPage /> : <Navigate to={'/login'} />} />
          <Route
            path="/profile"
            element={auth ? <ProfilePage /> : <Navigate to={'/login'} />} />
          <Route
            path="/read/:id"
            element={auth ? <ReadBook /> : <Navigate to={'/login'} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="books" element={<AdminBooks />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  )
}