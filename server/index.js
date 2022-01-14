// import as es6 feature 
// require as old feature in react
// what is the backend what is the thing which is convert our high levl to low level es6 --babel..
// const express = require("express"); rather thn require....import express

import express from "express";
import cosr from "cors";
import helmet from "helmet";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cosr());

zomato.get("/", (req, res) => res.json({ message: "SetUp Success Yay!!" }));

zomato.listen(4000, () => console.log("Server is up and running"));


