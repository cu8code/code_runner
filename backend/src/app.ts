#!/bin/env node

import { Server } from "socket.io";
import setup from "./setup"
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { run_cpp_python_handeler } from "./event-haneler/run";

(async () => {
    let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null = null
    const { PORT } = await setup

    console.debug("trying to connect to port : " + PORT)

    io = new Server(PORT, {
        cors: {
            origin: "*",
        }
    })

    if (io === null) {
        console.error("All PORT are in use!!!");
        process.exit()
    }

    console.debug(`http://localhost:${PORT}/`);

    io.on('connection', socket => {
        console.log('user connected ' + socket.id)

        socket.on("run-python:create", (_code: string, _input: string, _c: (res: any) => any) => {
            console.log("python handeler");
            console.log(_c);
            
            _c({
                error: ""
            })
        })
        socket.on("run-cpp:create", run_cpp_python_handeler)

    })
})()