import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function Notes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchNotes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/notes?authorId=${user.id}`
        );
        setNotes(
          response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error("Error loading notes:", error);
        setError("Failed to load notes. Please try again later.");
      }
    }

    fetchNotes();
  }, [user, navigate]);

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete note. Please try again later.");
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="prose mx-auto flex flex-col gap-6 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-700">Your Notes</h1>

      <button
        onClick={() => navigate("/notes/create")}
        className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 self-start"
      >
        Create New Note
      </button>

      <input
        type="text"
        placeholder="Search Notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />

      {error && <div className="text-red-400">{error}</div>}

      <div className="flex flex-col gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="border p-4 bg-gray-50 shadow-sm flex justify-between items-center"
            >
              <div
                onClick={() => navigate(`/notes/${note.id}`)}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-medium text-gray-700">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/notes/${note.id}/edit`)}
                  className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">
            You have no notes yet.
          </div>
        )}
      </div>
    </div>
  );
}
