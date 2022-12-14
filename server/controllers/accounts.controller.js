import {
  addAccount,
  getAccount,
  getAllAccounts,
  saveAccounts,
  updateCurrentAccount,
} from "../utils.js";
export const addNewAccount = (req, res) => {
  const newAccount = addAccount(req.params.owner, req.params.credit);
  res.status(200).send(newAccount);
};
export const updateAccount = (req, res) => {
  const account = updateCurrentAccount(req.params.owner, req.params.newCredit);
  console.log(req.params.id, req.params.newCredit);
  res.status(200).send(account);
};
export const getAccounts = (req, res) => {
  const allAccounts = getAllAccounts();
  res.status(200).send(allAccounts);
};
export const depositCash = (req, res) => {
  const allAccounts = getAllAccounts().filter(
    (client) => client.id !== req.params.id
  );

  let client = getAllAccounts().find((client) => client.id === req.params.id);
  client = {
    ...client,
    cash: client.cash + +req.params.amount,
    transactions: [
      ...client.transactions,
      {
        lastUpdate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        state: req.params.amount,
      },
    ],
  };
  allAccounts.push(client);
  saveAccounts(allAccounts);
  res.status(200).send(allAccounts);
};

export const transferMoney = (req, res) => {
  const allAccounts = getAllAccounts();
  const newData = allAccounts.filter((data) => {
    data.id !== req.params.fromId && data.id !== req.params.toId;
  });
  let client1 = getAccount(req.params.fromId);
  let client2 = getAccount(req.params.toId);
  if (client1.credit - req.params.salary < 0) {
    console.log("No enough credit");
    res.status(200).send(client1);
    return;
  }
  const newCash1 = +client1.cash - req.params.salary;
  const newCash2 = +client2.cash + +req.params.salary;

  client1 = {
    ...client1,
    cash: newCash1,
    creditStatus:
      newCash1 < 0 ? client1.creditStatus - req.params.salary : client1.credit,
    transactions: [
      ...client1.transactions,
      {
        lastUpdate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        state: -req.params.salary,
      },
    ],
  };
  client2 = {
    ...client2,
    cash: newCash2,
    creditStatus:
      newCash2 < 0 ? client2.creditStatus - req.params.salary : client2.credit,
    transactions: [
      ...client2.transactions,
      {
        lastUpdate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        state: +req.params.salary,
      },
    ],
  };
  newData.push(client1, client2);
  saveAccounts(newData);
  res.status(200).send(newData);
};
