import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/sweets/";

const SweetManager = () => {
  const [sweets, setSweets] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sweetData = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}`, sweetData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Sweet updated successfully!");
      } else {
        await axios.post(API_URL, sweetData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Sweet added successfully!");
      }
      setForm({ name: "", category: "", price: "", quantity: "" });
      setEditId(null);
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Error saving sweet");
    }
  };

  const handleEdit = (sweet) => {
    setEditId(sweet.id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sweet deleted");
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Error deleting sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
          🍬 Manage Sweets
        </h2>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-6 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border border-pink-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border border-pink-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border border-pink-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border border-pink-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition duration-200 shadow-md"
            >
              {editId ? "Update Sweet" : "Add Sweet"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({ name: "", category: "", price: "", quantity: "" });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          {loading ? (
            <p className="text-center p-4 text-gray-500">Loading sweets...</p>
          ) : sweets.length === 0 ? (
            <p className="text-center p-4 text-gray-500">No sweets found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-200 text-gray-800">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sweets.map((sweet, index) => (
                  <tr
                    key={sweet.id}
                    className={`hover:bg-pink-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-pink-50"
                    }`}
                  >
                    <td className="p-3 border-t">{sweet.name}</td>
                    <td className="p-3 border-t">{sweet.category}</td>
                    <td className="p-3 border-t">₹{sweet.price.toFixed(2)}</td>
                    <td className="p-3 border-t">{sweet.quantity}</td>
                    <td className="p-3 border-t text-center space-x-2">
                      <button
                        onClick={() => handleEdit(sweet)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetManager;
