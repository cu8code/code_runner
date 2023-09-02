#!/bin/env node

import { Server } from "socket.io";
import setup from "./setup"
import { run_handeler } from "./event-haneler/run";

(async () => {
    const { PORT } = await setup

    const io = new Server(PORT, {
        cors: {
            origin: "*",
        }
    })

    console.debug(`http://localhost:${PORT}/`);

    io.on('connection', async socket => {

        socket.on('run', await run_handeler(socket))

    })
})()