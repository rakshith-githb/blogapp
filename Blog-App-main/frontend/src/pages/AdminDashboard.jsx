import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data } = await API.get("/admin/articles");
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const fetchDeleted = async () => {
    try {
      const { data } = await API.get("/articles/deleted");
      setDeleted(data);
    } catch (error) {
      console.error("Failed to fetch deleted articles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
    fetchDeleted();
  }, []);

  const toggleUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Toggle failed:", error);
      alert("Failed to toggle user status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user");
    }
  };

  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await API.delete(`/admin/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete article: " + (error.response?.data?.message || error.message));
    }
  };

  const restoreArticle = async (id) => {
    try {
      await API.put(`/articles/restore/${id}`);
      fetchDeleted();
      fetchArticles();
    } catch (error) {
      console.error("Restore failed:", error);
      alert("Failed to restore article");
    }
  };

  const stats = {
    users: users.length,
    articles: articles.length,
    deleted: deleted.length,
    activeUsers: users.filter((u) => u.isActive).length,
  };

  return (
    <div className="admin-dashboard">
      {/* ── Sidebar Navigation ───────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__title">Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav__section-label">Dashboard</p>
          <NavLink
            icon="📊"
            label="Overview"
            tab="overview"
            active={activeTab}
            onClick={setActiveTab}
          />

          <p className="admin-nav__section-label">Management</p>
          <NavLink
            icon="👥"
            label="Users"
            tab="users"
            active={activeTab}
            onClick={setActiveTab}
          />
          <NavLink
            icon="📝"
            label="Articles"
            tab="articles"
            active={activeTab}
            onClick={setActiveTab}
          />
          <NavLink
            icon="🗑️"
            label="Trash"
            tab="trash"
            active={activeTab}
            onClick={setActiveTab}
          />
        </nav>
      </aside>

      {/* ── Main Content ────────────────────────────────────── */}
      <main className="admin-content">
        {/* Page Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-header__title">Dashboard</h1>
            <p className="admin-header__subtitle">
              Manage your blog content, users, and site settings
            </p>
          </div>
          <div className="admin-header__meta">
            <span className="admin-badge">Last updated: just now</span>
          </div>
        </div>

        {/* Overview Tab - Statistics */}
        {activeTab === "overview" && (
          <div className="admin-section">
            <div className="admin-stats-grid">
              <StatCard
                label="Total Users"
                value={stats.users}
                change="+2% this month"
                color="blue"
                icon="👥"
              />
              <StatCard
                label="Active Users"
                value={stats.activeUsers}
                change={`${
                  stats.users > 0
                    ? Math.round((stats.activeUsers / stats.users) * 100)
                    : 0
                }% active`}
                color="green"
                icon="✓"
              />
              <StatCard
                label="Published Articles"
                value={stats.articles}
                change="+5 this week"
                color="purple"
                icon="📝"
              />
              <StatCard
                label="Deleted Items"
                value={stats.deleted}
                change="In trash"
                color="red"
                icon="🗑️"
              />
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Users Management</h2>
              <span className="admin-section__count">
                {users.length} users
              </span>
            </div>

            <div className="admin-table-container">
              {users.length === 0 ? (
                <div className="admin-empty-state">
                  <p>No users yet</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className={`admin-table__row ${
                          !user.isActive ? "disabled" : ""
                        }`}
                      >
                        <td className="admin-table__user">
                          <div className="admin-user-cell">
                            <div className="admin-avatar">
                              {user.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="admin-user-name">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <RoleBadge role={user.role} />
                        </td>
                        <td>
                          <StatusBadge active={user.isActive} />
                        </td>
                        <td className="admin-table__actions">
                          <button
                            className={`admin-btn admin-btn--sm ${
                              user.isActive
                                ? "admin-btn--warning"
                                : "admin-btn--success"
                            }`}
                            onClick={() => toggleUser(user._id)}
                            title={
                              user.isActive
                                ? "Deactivate user"
                                : "Activate user"
                            }
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            className="admin-btn admin-btn--sm admin-btn--danger"
                            onClick={() => deleteUser(user._id)}
                            title="Delete user permanently"
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
        )}

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">All Articles</h2>
              <span className="admin-section__count">
                {articles.length} articles
              </span>
            </div>

            <div className="admin-table-container">
              {articles.length === 0 ? (
                <div className="admin-empty-state">
                  <p>No articles published yet</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article._id}>
                        <td className="admin-table__title">
                          <span className="admin-article-title">
                            {article.title}
                          </span>
                        </td>
                        <td>{article.author?.name || "Unknown"}</td>
                        <td>
                          <span className="admin-badge admin-badge--secondary">
                            {article.category}
                          </span>
                        </td>
                        <td className="admin-table__date">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="admin-table__actions">
                          <button
                            className="admin-btn admin-btn--sm admin-btn--danger"
                            onClick={() => deleteArticle(article._id)}
                            title="Delete article"
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
        )}

        {/* Trash Tab */}
        {activeTab === "trash" && (
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Trash</h2>
              <span className="admin-section__count">
                {deleted.length} items
              </span>
            </div>

            <div className="admin-table-container">
              {deleted.length === 0 ? (
                <div className="admin-empty-state">
                  <p>Trash is empty</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Deleted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deleted.map((article) => (
                      <tr key={article._id} className="admin-table__deleted-row">
                        <td className="admin-table__title">
                          <span className="admin-article-title admin-article-title--deleted">
                            {article.title}
                          </span>
                        </td>
                        <td>{article.author?.name || "Unknown"}</td>
                        <td className="admin-table__date">
                          {new Date(
                            article.deletedAt || article.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="admin-table__actions">
                          <button
                            className="admin-btn admin-btn--sm admin-btn--success"
                            onClick={() => restoreArticle(article._id)}
                            title="Restore article"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ── Sub-components ───────────────────────────────────────────────

function NavLink({ icon, label, tab, active, onClick }) {
  return (
    <button
      className={`admin-nav__link ${active === tab ? "active" : ""}`}
      onClick={() => onClick(tab)}
    >
      <span className="admin-nav__icon">{icon}</span>
      <span className="admin-nav__label">{label}</span>
    </button>
  );
}

function StatCard({ label, value, change, color, icon }) {
  return (
    <div className={`admin-stat-card admin-stat-card--${color}`}>
      <div className="admin-stat-card__header">
        <h3 className="admin-stat-card__label">{label}</h3>
        <span className="admin-stat-card__icon">{icon}</span>
      </div>
      <div className="admin-stat-card__content">
        <p className="admin-stat-card__value">{value}</p>
        <p className="admin-stat-card__change">{change}</p>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const map = {
    admin: "badge-rose",
    author: "badge-sky",
    user: "badge-neutral",
  };
  return (
    <span className={`badge ${map[role] ?? "badge-neutral"}`}>
      {role}
    </span>
  );
}

function StatusBadge({ active }) {
  return active ? (
    <span className="badge badge-mint">Active</span>
  ) : (
    <span className="badge badge-danger">Inactive</span>
  );
}

export default AdminDashboard;