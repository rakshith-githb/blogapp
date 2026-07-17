import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Other",
    image: null,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path}`;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await API.get(`/articles/${id}`);
        const user = JSON.parse(localStorage.getItem("user"));

        const isOwner =
          data.author?._id === user?._id || user?.role === "admin";

        if (!isOwner) {
          setError("You are not allowed to edit this article.");
          return;
        }

        setForm({
          title: data.title || "",
          content: data.content || "",
          category: data.category || "Other",
          image: null,
        });
        setCurrentImage(data.coverImage || data.image || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (form.image) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("category", form.category || "Other");
        formData.append("image", form.image);

        await API.put(`/articles/${id}`, formData);
      } else {
        await API.put(`/articles/${id}`, {
          title: form.title,
          content: form.content,
          category: form.category || "Other",
        });
      }

      navigate("/my-articles");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "var(--sp-12)", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-12)" }}>
      <div className="container" style={{ maxWidth: "var(--container-md)" }}>
        <div style={{ marginBottom: "var(--sp-12)" }}>
          <h1 className="h1" style={{ marginBottom: "var(--sp-2)" }}>Edit Article</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-lg)" }}>
            Update your published article and save changes
          </p>
        </div>

        <div className="card animate-fadeup" style={{ padding: "var(--sp-8)", marginBottom: "var(--sp-8)", border: "1px solid var(--border-default)" }}>
          {error && (
            <div className="alert alert-error" style={{ marginBottom: "var(--sp-8)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-8)" }}>
            <div className="input-group">
              <label className="input-label" htmlFor="title">Article Title *</label>
              <input
                id="title"
                className="input-field"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="category">Category</label>
              <select
                id="category"
                className="input-field"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Design">Design</option>
                <option value="Culture">Culture</option>
                <option value="Science">Science</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="content">Content *</label>
              <textarea
                id="content"
                className="input-field"
                rows="12"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                style={{ resize: "vertical", padding: "var(--sp-4)" }}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="image">Replace Cover Image</label>
              {(imagePreview || currentImage) && (
                <label htmlFor="image" style={{ cursor: "pointer", display: "block" }}>
                  <img
                    src={imagePreview || getImageUrl(currentImage)}
                    alt="Cover preview"
                    style={{ width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: "var(--r-md)", marginBottom: "var(--sp-4)" }}
                  />
                </label>
              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {form.image && (
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: "var(--sp-2)" }}>
                  Selected: {form.image.name}
                </p>
              )}
            </div>

            <div style={{ display: "flex", gap: "var(--sp-3)", marginTop: "var(--sp-4)", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => navigate("/my-articles")}
                className="btn btn-ghost"
                style={{ width: "100%" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !form.title || !form.content}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
