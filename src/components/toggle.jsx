import React, { useState } from "react";

export default function ToggleExample() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Toggle Test</h2>

      <p><b>Open State:</b> {open ? "TRUE" : "FALSE"}</p>

      <button onClick={toggle} style={{ marginTop: "10px" }}>
        Toggle
      </button>

      {open && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#eee" }}>
          This content is visible when <b>open = true</b>.
        </div>
      )}
    </div>
  );
}
