import {
  addClient,
  gettAllClients,
  updateCurrentClient,
  deleteCurrentClient,
  getClient,
} from "../utils.js";

export const getClients = (req, res) => {
  const allClients = gettAllClients();
  res.status(200).send(allClients);
};
export const getSpesificClient = (req, res) => {
  const client = getClient(req.params.id);
  res.status(200).send(client);
};
export const addNewClient = (req, res) => {
  const newClient = addClient(req.body);
  res.status(200).send(newClient);
};
export const updateClient = (req, res) => {
  const client = updateCurrentClient(req.body, req.params.id);
  res.status(200).send(client);
};
export const deleteClient = (req, res) => {
  const client = deleteCurrentClient(req.params.id);
  res.status(200).send(client);
};
