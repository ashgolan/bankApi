import uniqueId from "unique-id-key";
import fs from "fs";

const saveClients = (clients) => {
  const allClients = JSON.stringify(clients);
  fs.writeFileSync("./db/clientsData.json", allClients);
};
const saveAccounts = (accounts) => {
  const allAccounts = JSON.stringify(accounts);
  fs.writeFileSync("./db/clientsAccounts.json", allAccounts);
};

const addClient = (client) => {
  const allClients = gettAllClients();
  const findClient = allClients.find((cl) => cl.IdNumber === client.IdNumber);
  if (findClient) throw Error("client with same IdNumber was exsist !!");
  const newClient = {
    id: uniqueId.RandomString(5),
    ...client,
  };
  allClients.push(newClient);
  saveClients(allClients);
  return newClient;
};
const addAccount = (idNumber, newCredit) => {
  const allAccounts = getAllAccounts();
  const newAccount = {
    id: uniqueId.RandomNum(6),
    owner: idNumber,
    cash: 0,
    creditStatus: newCredit,
    credit: newCredit,
    transactions: [
      {
        lastUpdate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        state: "פתיחת חשבון",
      },
    ],
  };
  allAccounts.push(newAccount);
  saveAccounts(allAccounts);
  return newAccount;
};

const getClient = (id) => {
  const allClients = gettAllClients();
  const client = allClients.find((cl) => cl.id === id);
  return client;
};
const getAccount = (id) => {
  const allAccounts = getAllAccounts();
  const account = allAccounts.find((ac) => ac.id === id);
  return account;
};

const updateCurrentClient = (client, id) => {
  const allClients = gettAllClients();
  const clients = allClients.filter((cl) => cl.id !== +id);
  clients.push(client);
  saveClients(clients);
  return client;
};
const updateCurrentAccount = (id, newCredit) => {
  const allAccounts = getAllAccounts().filter((account) => account.id !== id);
  let account = getAllAccounts().find((account) => account.id === id);
  account = {
    ...account,
    credit: +newCredit,
    transactions: [
      ...account.transactions,
      { lastUpdate: new Date(), state: `change Credit: ${newCredit}` },
    ],
  };
  allAccounts.push(account);
  saveAccounts(allAccounts);
  return account;
};

const deleteCurrentClient = (id) => {
  const allClients = gettAllClients();
  const clients = allClients.filter((cl) => cl.id !== +id);
  saveClients(clients);
  return clients;
};

const gettAllClients = () => {
  try {
    const dataBuffer = fs.readFileSync("./db/clientsData.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const getAllAccounts = () => {
  try {
    const dataBuffer = fs.readFileSync("./db/clientsAccounts.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export {
  addClient,
  gettAllClients,
  updateCurrentClient,
  deleteCurrentClient,
  getClient,
  addAccount,
  getAccount,
  getAllAccounts,
  saveAccounts,
  updateCurrentAccount,
};
