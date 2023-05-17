import express from "express";
import { router } from "./router/routes";
const app = express();

app.use(express.json());
app.use(router);

app.listen(3030, () => console.log("servidor rodando na porta 3030!"));
