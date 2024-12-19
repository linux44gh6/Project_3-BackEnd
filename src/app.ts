import { Request, Response } from "express";

const express = require("express");
export const app = express();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
