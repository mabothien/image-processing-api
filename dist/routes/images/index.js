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
const express_1 = require("express");
const handleFile_1 = require("../../utilities/handleFile");
const logger_1 = __importDefault(require("../../utilities/logger"));
const imageRoute = (0, express_1.Router)();
imageRoute.get("/", logger_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    const file = yield (0, handleFile_1.resize)(filename, width, height);
    file === null || file === void 0 ? void 0 : file.toFile(`./thumbs/${filename}-${width}-${height}.jpg`, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.send('Something error. Need to check');
            return;
        }
        file.toBuffer();
        file.pipe(res.status(200));
    }));
}));
exports.default = imageRoute;
