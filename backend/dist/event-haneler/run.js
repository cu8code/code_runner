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
exports.run_handeler = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const os_1 = require("os");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
function run_handeler(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: add structure assertion to the data object
        return (data, callback) => __awaiter(this, void 0, void 0, function* () {
            console.debug(data);
            const path = (0, path_1.join)((0, os_1.homedir)(), "temp", socket.id);
            yield exec(['mkdir', '-p', path].join(' '));
            let STDERR;
            let STDOUT;
            switch (data.lang) {
                case "py": {
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'temp.py'), data.code);
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'input'), data.input);
                    const { stderr, stdout } = yield exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'python'].join(' '));
                    STDERR = stderr;
                    STDOUT = stdout;
                    break;
                }
                case "cpp": {
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'temp.cpp'), data.code);
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'input'), data.input);
                    const { stderr, stdout } = yield exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'cpp'].join(' '));
                    STDERR = stderr;
                    STDOUT = stdout;
                    break;
                }
                case "c": {
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'temp.c'), data.code);
                    yield (0, promises_1.writeFile)((0, path_1.join)(path, 'input'), data.input);
                    const { stderr, stdout } = yield exec(['docker', 'run', '-v', `${path}:/code`, '-a', 'stdout', '-a', 'stderr', 'clang'].join(' '));
                    STDERR = stderr;
                    STDOUT = stdout;
                    break;
                }
            }
            if (STDERR) {
                callback({
                    output: STDERR
                });
                return null;
            }
            callback({
                output: STDOUT
            });
            return null;
        });
    });
}
exports.run_handeler = run_handeler;
