import router from "express";
import {
  addNewAccount,
  transferMoney,
  getAccounts,
  depositCash,
  updateAccount,
} from "../controllers/accounts.controller.js";
import {
  addNewClient,
  getClients,
  getSpesificClient,
  updateClient,
  deleteClient,
} from "../controllers/users.controllers.js";

export const bankRouter = router();

bankRouter.post("/users", addNewClient);
bankRouter.get("/users", getClients);
bankRouter.get("/users/:id", getSpesificClient);
bankRouter.put("/:id", updateClient);
bankRouter.delete("/:id", deleteClient);
//---------------------------------------------------
bankRouter.get("/accounts", getAccounts);
bankRouter.get("/accounts/deposit/:id/:amount", depositCash);
bankRouter.post("/accounts/addAccount/:owner/:credit", addNewAccount);
bankRouter.put("/accounts/updateAccount/:id/:newCredit", updateAccount);
bankRouter.get("/accounts/transfer/:fromId/:toId/:salary", transferMoney);
