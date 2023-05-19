import React, { useContext, useState } from "react";
import { ClientContext } from "../context/ClientContext";
import { ClientItem } from "./ClientItem";
import { AddClientForm } from "./AddClientForm";
import "../styles/styles.css";

export const ClientList: React.FC = () => {
  const { clients, editClient, removeClient } = useContext(ClientContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleFilterStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(e.target.value);
  };
  //  search by email
  const filteredClients = clients.filter((client) =>
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //  sorting by name
  const sortedClients = filteredClients.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
  //  status filter
  const filteredAndSortedClients = sortedClients.filter((client) =>
    filterStatus ? client.status === filterStatus : true
  );

  return (
    <div>
      {/* Search input field */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
        />
        {/*  Sort By Name */}
        <label htmlFor="sortOrder">Sort By Name:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>

        {/* Filter by status dropdown */}
        <label htmlFor="filterStatus">Filter By Status:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={handleFilterStatusChange}
        >
          <option value="">All</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>
      {/* Add Client Form */}
      <AddClientForm />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedClients.map((client) => (
            <ClientItem
              key={client.id}
              client={client}
              onEdit={editClient}
              onRemove={removeClient}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
