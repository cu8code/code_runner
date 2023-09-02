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
    const { PORT } = yield setup_1.default;
    const io = new socket_io_1.Server(PORT, {
        cors: {
            origin: "*",
        }
    });
    console.debug(`http://localhost:${PORT}/`);
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        socket.on('run', yield (0, run_1.run_handeler)(socket));
    }));
}))();
