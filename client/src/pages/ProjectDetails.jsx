
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchProjectAndUpdates = async () => {
      const updatesRes = await fetch(`http://localhost:5000/api/projects/${id}/updates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatesData = await updatesRes.json();
      setUpdates(updatesData);
    };
    if (token) fetchProjectAndUpdates();
  }, [id, token]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.imageUrl);
    }
  };

  const handleAddUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/projects/${id}/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newUpdate, imageUrl }),
    });
    const data = await res.json();
    setUpdates([data, ...updates]);
    setNewUpdate({ title: '', content: '' });
    setImageUrl('');
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>
          </div>

          {user.role === 'engineer' && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Add Update</h3>
              <form onSubmit={handleAddUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 max-h-40 rounded" />}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Post Update
                </button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {updates.map((update) => (
              <div key={update.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                  <span className="text-sm text-gray-500">
                    By {update.author_name} • {new Date(update.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600">{update.content}</p>
                {update.image_url && (
                  <img src={update.image_url} alt="Update" className="mt-4 max-w-full rounded" />
                )}
              </div>
            ))}
            {updates.length === 0 && (
              <p className="text-center text-gray-500">No updates yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetails;
