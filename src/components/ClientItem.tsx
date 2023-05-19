import React, { useState } from "react";
import { Client, ClientStatus } from "../model/Client";
import { EditClientForm } from "./EditClientForm";

interface ClientItemProps {
  client: Client;
  onEdit: (
    id: number,
    name: string,
    dateOfBirth: string,
    email: string,
    status: ClientStatus
  ) => void;
  onRemove: (id: number) => void;
}

export const ClientItem: React.FC<ClientItemProps> = ({
  client,
  onEdit,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  // Function to handle client save editing
  const handleSave = (
    id: number,
    name: string,
    dateOfBirth: string,
    email: string,
    status: ClientStatus
  ) => {
    onEdit(id, name, dateOfBirth, email, status);
    setIsEditing(false);
  };
  // Function to handle client cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };
  // Function to handle client deletion
  const handleRemove = () => {
    onRemove(client.id);
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.dateOfBirth}</td>
      <td>{client.email}</td>
      <td>{client.status}</td>
      <td>
        {isEditing ? (
          <EditClientForm
            client={client}
            onClose={handleCancel}
            onEdit={handleSave}
          />
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </>
        )}
      </td>
    </tr>
  );
};
