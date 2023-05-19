import React, { ChangeEvent, useState } from "react";
import { Client, ClientStatus } from "../model/Client";

interface EditClientFormProps {
  client: Client;
  onClose: () => void;
  onEdit: (
    id: number,
    name: string,
    dateOfBirth: string,
    email: string,
    status: ClientStatus
  ) => void;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({
  client,
  onClose,
  onEdit,
}) => {
  const [editedName, setEditedName] = useState(client.name);
  const [editedDateOfBirth, setEditedDateOfBirth] = useState(
    client.dateOfBirth
  );
  const [editedEmail, setEditedEmail] = useState(client.email);
  const [editedStatus, setEditedStatus] = useState<ClientStatus>(client.status);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onEdit(client.id, editedName, editedDateOfBirth, editedEmail, editedStatus);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Edit Client</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="editedName">Name:</label>
            <input
              type="text"
              id="editedName"
              value={editedName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedName(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="editedDateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="editedDateOfBirth"
              value={editedDateOfBirth}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedDateOfBirth(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="editedEmail">Email:</label>
            <input
              type="email"
              id="editedEmail"
              value={editedEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedEmail(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="editedStatus">Status:</label>
            <input
              type="text"
              id="editedStatus"
              value={editedStatus}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditedStatus(e.target.value as ClientStatus)
              }
            />
          </div>
          <div className="button-container">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
