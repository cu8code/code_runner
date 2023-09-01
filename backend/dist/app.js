#!/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const setup_1 = __importDefault(require("./setup"));
const run_1 = require("./event-haneler/run");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let io = null;
    const { PORT } = yield setup_1.default;
    console.debug("trying to connect to port : " + PORT);
    io = new socket_io_1.Server(PORT, {
        cors: {
            origin: "*",
        }
    });
    if (io === null) {
        console.error("All PORT are in use!!!");
        process.exit();
    }
    console.debug(`http://localhost:${PORT}/`);
    io.on('connection', socket => {
        console.log('user connected ' + socket.id);
        socket.on("run-python:create", (_code, _input, _c) => {
            console.log("python handeler");
            console.log(_c);
            _c({
                error: ""
            });
        });
        socket.on("run-cpp:create", run_1.run_cpp_python_handeler);
    });
}))();
