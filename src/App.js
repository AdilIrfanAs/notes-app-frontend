import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import NoteManager from "./pages/note-manager/note-manager";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./contexts/auth-context";
import { NoteProvider } from "./contexts/note-context";
import ViewNote from "./pages/note-manager/view-note";
import EditNote from "./pages/note-manager/edit-note";
import PageNotFound from "./components/page-not-found";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <NoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}/>
              <Route path="dashboard/add" element={<NoteManager />} />
              <Route path="dashboard/view/:noteId" element={<ViewNote />} />
              <Route path="dashboard/edit/:noteId" element={<EditNote />} />
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
      </NoteProvider>
    </AuthProvider>
  );
};

export default App;
