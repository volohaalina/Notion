import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Notes } from "./pages/Notes";
import { CreateNote } from "./pages/CreateNote";
import { EditNote } from "./pages/EditNote";
import { NoteDetails } from "./pages/NoteDetails";
import { NotFound } from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/register"
            element={
              <Layout>
                <Registration />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/notes"
            element={
              <Layout>
                <Notes />
              </Layout>
            }
          />
          <Route
            path="/notes/create"
            element={
              <Layout>
                <CreateNote />
              </Layout>
            }
          />
          <Route
            path="/notes/:id/edit"
            element={
              <Layout>
                <EditNote />
              </Layout>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <Layout>
                <NoteDetails />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
