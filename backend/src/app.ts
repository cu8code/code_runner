#!/bin/env node

import { Server } from "socket.io";
import setup from "./setup"

(async () => {
    const { PORT } = await setup

    console.debug("trying to connect to port : " + PORT)

    const io = new Server(PORT, {
        cors: {
            origin: "*",
        }
    })

    console.debug(`http://localhost:${PORT}/`);

    io.on('connection', socket => {
        console.log('user connected ' + socket.id)

        socket.on('run-python:create', (code: any, c: any) => {
            console.log(code, c);
            console.log("event run-python:create");
        })

        socket.on('run-cpp:create', (code: any, c: any) => {
            console.log(code, c);
            console.log("event run-cpp:create");
        })
    })
})()