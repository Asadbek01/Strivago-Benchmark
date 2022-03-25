import express from "express";

import accommodationRouter from "./accommodation";
import usersRouter from "./users"
import cors from "cors"

const server = express();

process.env.TS_NODE_DEV && require("dotenv").config();

server.use(express.json());
server.use(cors())

// // cors middleware's
// server.use(cors);

// Endpoints
server.use("/accommodations", accommodationRouter);
server.use('/users', usersRouter)
export { server };
