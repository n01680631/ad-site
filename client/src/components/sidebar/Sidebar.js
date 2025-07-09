import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

// Sidebar component renders navigation links
const Sidebar = () => {
  // Array of navigation links with path and display name
  const links = [
    { path: "/", name: "Dashboard" },
    { path: "/leads", name: "Leads" },
    { path: "/analytics", name: "Analytics" },
    { path: "/reports", name: "Reports" },
    { path: "/create-Add", name: "Create Add" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {/* Map through links to create list items with React Router Links */}
        {links.map(link => (
          <li key={link.path}>
            <Link to={link.path} data-char={link.name.charAt(0)}>
              {/* Display link name */}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
