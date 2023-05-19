import React, { createContext, useState } from "react";
import { Client } from "../model/Client";
import { initialClients } from "../data/ClientData";

interface ClientContextProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  addClient: (client: Client) => void;
  editClient: (
    id: number,
    name: string,
    dateOfBirth: string,
    email: string
  ) => void;
  removeClient: (id: number) => void;
}

export const ClientContext = createContext<ClientContextProps>({
  clients: [],
  setClients: () => {},
  addClient: () => {},
  editClient: () => {},
  removeClient: () => {},
});

interface ClientProviderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
}
export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(initialClients);

  // Function to handle client adding
  const addClient = (client: Client) => {
    setClients([...clients, client]);
  };

  // Function to handle client editing
  const editClient = (
    id: number,
    name: string,
    dateOfBirth: string,
    email: string
  ) => {
    const updatedClients = clients.map((client) => {
      if (client.id === id) {
        return { ...client, name, dateOfBirth, email };
      }
      return client;
    });
    setClients(updatedClients);
  };

  // Function to handle client deletion
  const removeClient = (id: number) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
  };

  const contextValue: ClientContextProps = {
    clients,
    setClients,
    addClient,
    editClient,
    removeClient,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};
