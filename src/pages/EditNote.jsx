import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    createdAt: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await axios.get(`http://localhost:5000/notes/${id}`);
        const note = response.data;
        setFormData({
          title: note.title,
          body: note.body,
          createdAt: note.createdAt,
        });
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title cannot be empty";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/notes/${id}`, formData);
      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="prose mx-auto flex flex-col gap-6 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-700 text-center">
        Edit Note
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Note title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        {errors.title && <div className="text-red-400">{errors.title}</div>}

        <textarea
          name="body"
          placeholder="Note content (optional)"
          value={formData.body}
          onChange={handleChange}
          className="border p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
