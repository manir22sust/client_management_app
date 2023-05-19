import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "../context/ClientContext";
import { ClientStatus } from "../model/Client";

export const AddClientForm: React.FC = () => {
  const { addClient } = useContext(ClientContext);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email, dateOfBirth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Generate a unique ID for the client
      const id = Date.now();

      // Create the new client object
      const newClient = {
        id,
        name,
        dateOfBirth,
        email,
        status: ClientStatus.PENDING,
      };

      // Add the client to the list
      addClient(newClient);

      // Clear the form inputs
      setName("");
      setDateOfBirth("");
      setEmail("");
      setErrors({ name: "", dateOfBirth: "", email: "" });

      // Close the modal
      setIsModalOpen(false);
    }
  };
  // Form validation
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: "", dateOfBirth: "", email: "" };

    if (!name.trim() && (name !== "" || isModalOpen)) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!dateOfBirth.trim() && (dateOfBirth !== "" || isModalOpen)) {
      newErrors.dateOfBirth = "Date of Birth is required";
      isValid = false;
    }

    if (!email.trim() && (email !== "" || isModalOpen)) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+$/.test(email) && email !== "") {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Client</button>
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>Add Client</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {errors.dateOfBirth && (
                  <span className="error">{errors.dateOfBirth}</span>
                )}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="buttoncontainer">
                <button type="submit">Add Client</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
