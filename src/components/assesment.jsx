import React, { useMemo, useState } from "react";

// Sample data (from user)
const initialPeople = [
  { id: "p1", name: "Alice Johnson", role: "Engineer", location: "Jaipur" },
  { id: "p2", name: "Ravi Sharma", role: "Designer", location: "Delhi" },
  { id: "p3", name: "Meera Kapoor", role: "PM", location: "Bengaluru" },
  { id: "p4", name: "Ishaan Mehta", role: "QA", location: "Pune" },
  { id: "p5", name: "Zoya Khan", role: "Engineer", location: "Gurugram" },
];

export default function PeopleDirectory() {
  // Controlled state (search, sort, selection)
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedId, setSelectedId] = useState(null);
  // favorites stored in component state (id -> boolean)
  const [favorites, setFavorites] = useState({});

  // derived filtered + sorted list
  const visible = useMemo(() => {
    const filtered = initialPeople.filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    const sorted = [...filtered];
    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "role":
        sorted.sort((a, b) => a.role.localeCompare(b.role) || a.name.localeCompare(b.name));
        break;
      case "location":
        sorted.sort((a, b) => a.location.localeCompare(b.location) || a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [search, sortBy]);

  const selectedPerson = useMemo(() => visible.find((p) => p.id === selectedId) ?? initialPeople.find((p) => p.id === selectedId) ?? null, [selectedId, visible]);

  function toggleFavorite(id) {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // plain inline styles (no Tailwind)
  const styles = {
    container: { maxWidth: 900, margin: "0 auto", padding: 16, fontFamily: "Arial, sans-serif" },
    header: { fontSize: 20, fontWeight: 600, marginBottom: 12 },
    controls: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" },
    input: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4, minWidth: 200 },
    select: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4 },
    layout: { display: "flex", flexDirection: "row", gap: 12 },
    listWrap: { flex: 1, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden" },
    listItemBtn: { width: "100%", textAlign: "left", padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", border: "none", cursor: "pointer" },
    listItemHover: { background: "#f7f7f7" },
    selected: { background: "#e7f1ff", boxShadow: "inset 0 0 0 2px #cfe4ff" },
    meta: { fontSize: 13, color: "#444" },
    details: { width: 260, border: "1px solid #ddd", borderRadius: 4, padding: 12, boxSizing: "border-box" },
    emptyState: { padding: 16, textAlign: "center", color: "#666" },
    favStar: { fontSize: 16, marginLeft: 8 }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>People directory</h2>

      {/* Controls */}
      <div style={styles.controls}>
        <label htmlFor="search-input">
          <span style={{ position: "absolute", left: -9999 }} aria-hidden>Search people by name</span>
          <input
            id="search-input"
            aria-label="Search people by name"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </label>

        <label htmlFor="sort-select">
          <select
            id="sort-select"
            aria-label="Sort people"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="role">Role</option>
            <option value="location">Location</option>
          </select>
        </label>
      </div>

      {/* Main layout: list + details panel (responsive) */}
      <div style={{ ...styles.layout, flexDirection: "row" }}>
        {/* List */}
        <div style={styles.listWrap}>
          {visible.length === 0 ? (
            <div style={styles.emptyState}>No results found.</div>
          ) : (
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {visible.map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <li key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                    <button
                      onClick={() => setSelectedId(p.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSelectedId(p.id);
                      }}
                      aria-pressed={isSelected}
                      style={{
                        ...styles.listItemBtn,
                        ...(isSelected ? styles.selected : {}),
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        <div style={styles.meta}>{p.role} • {p.location}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={styles.favStar}>{favorites[p.id] ? "★" : "☆"}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Details panel */}
        <div style={styles.details} aria-live="polite">
          {selectedPerson ? (
            <div>
              <h3 style={{ margin: "0 0 8px 0" }}>{selectedPerson.name}</h3>
              <p style={{ margin: "4px 0" }}><strong>Role:</strong> {selectedPerson.role}</p>
              <p style={{ margin: "4px 0 12px 0" }}><strong>Location:</strong> {selectedPerson.location}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={!!favorites[selectedPerson.id]}
                    onChange={() => toggleFavorite(selectedPerson.id)}
                    aria-label={`Toggle favorite for ${selectedPerson.name}`}
                  />
                  <span>{favorites[selectedPerson.id] ? "Favorited" : "Mark as favorite"}</span>
                </label>

                <button
                  onClick={() => setSelectedId(null)}
                  style={{ marginLeft: "auto", padding: "6px 10px", border: "1px solid #ccc", borderRadius: 4, background: "white", cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: "#666" }}>Select a person to see details.</div>
          )}
        </div>
      </div>

      {/* Small responsive tweak: move details below on narrow screens using simple CSS */}
      <style>{`
        @media (max-width: 640px) {
          /* make the layout stack vertically on small screens */
          .people-directory-stack { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
