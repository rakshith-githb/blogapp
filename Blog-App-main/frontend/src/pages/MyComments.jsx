import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Protect route
  if (!user) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/comments/user/my-comments");
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComments();
  }, []);

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await API.delete(`/comments/${commentId}`);
        setComments(comments.filter(c => c._id !== commentId));
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment");
      }
    }
  };

  return (
    <section style={{ padding: 'var(--sp-12)', background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)' }}>
          <h1 className="h1" style={{ marginBottom: 'var(--sp-3)' }}>My Comments</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            View and manage all the comments you've made on articles
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: 'var(--sp-10)', color: 'var(--text-muted)' }}>
            <p>Loading your comments...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--bg-subtle)', borderRadius: 'var(--r-lg)', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: 'var(--sp-4)' }}>You haven't made any comments yet.</p>
            <Link to="/" className="btn btn-primary btn-sm">
              Explore Articles
            </Link>
          </div>
        )}

        {/* Comments List */}
        {!loading && comments.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
            {comments.map((comment) => (
              <div 
                key={comment._id}
                style={{
                  padding: 'var(--sp-6)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid rgba(91, 141, 239, 0.2)',
                  borderRadius: 'var(--r-lg)',
                  transition: 'all var(--dur-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(91, 141, 239, 0.5)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(91, 141, 239, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(91, 141, 239, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Comment Header */}
                <div style={{ marginBottom: 'var(--sp-3)' }}>
                  <Link 
                    to={`/article/${comment.article._id}`}
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      transition: 'color var(--dur-fast)',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-light)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
                  >
                    {comment.article.title}
                  </Link>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Comment Text */}
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--sp-4)',
                  padding: 'var(--sp-4)',
                  background: 'rgba(91, 141, 239, 0.05)',
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '0 var(--r-sm) var(--r-sm) 0'
                }}>
                  {comment.text}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                  <Link 
                    to={`/article/${comment.article._id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    View Article
                  </Link>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: 'var(--error)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyComments;
