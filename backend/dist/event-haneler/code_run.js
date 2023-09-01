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
exports.cpp_python_handeler = exports.runn_python_handeler = void 0;
function runn_python_handeler(data, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ data });
        callback({
            error: "pyhton error"
        });
    });
}
exports.runn_python_handeler = runn_python_handeler;
function cpp_python_handeler(data, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ data });
        callback({
            error: "cpp error"
        });
    });
}
exports.cpp_python_handeler = cpp_python_handeler;
