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
Object.defineProperty(exports, "__esModule", { value: true });
const net = require('net');
function isPortInUse(port) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const server = net.createServer()
                .listen(port, () => {
                server.close();
                resolve(false);
            })
                .on('error', () => {
                resolve(true);
            });
        });
    });
}
function getPort() {
    return __awaiter(this, void 0, void 0, function* () {
        let port = process.env['port'] || process.env['PORT'] || '3000';
        if (Number.isNaN(Number(port))) {
            port = '3001';
        }
        port = Number(port);
        let running = true;
        while (port >= 5000 && port >= 3000 || running) {
            console.log("testing port " + port);
            running = yield isPortInUse(port);
            if (!running) {
                return port;
            }
            port++;
        }
        return 0;
    });
}
function getEnv() {
    let env = process.env['node_env'] || process.env['NODE_ENV'] || 'dev';
    if (!(['dev', 'proc'].includes(env))) {
        env = 'dev';
    }
    return env;
}
const setup = (() => __awaiter(void 0, void 0, void 0, function* () {
    let PORT = yield getPort();
    let ENV = getEnv();
    return {
        PORT,
        ENV
    };
}))();
exports.default = setup;
