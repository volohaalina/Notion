import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`http://localhost:5000/notes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNote(data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error loading note:", error);
        navigate("/404");
      }
    }
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" });
      navigate("/notes");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (loading)
    return <div className="text-gray-700 text-center">Loading...</div>;

  return (
    <div className="prose mx-auto flex flex-col gap-6 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-700">{note.title}</h1>
      <p className="text-gray-600">{note.body || "No content available"}</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/notes/${id}/edit`)}
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/notes")}
          className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}
