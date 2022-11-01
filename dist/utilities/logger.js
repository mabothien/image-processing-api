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
const handleFile_1 = require("./handleFile");
const path_1 = __importDefault(require("path"));
const logger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    const resizedImgPath = `${filename}-${width}-${height}`;
    const isExistThumbs = yield (0, handleFile_1.isFileExist)(resizedImgPath, "./thumbs");
    if (isExistThumbs) {
        const options = {
            root: path_1.default.join('thumbs')
        };
        res.sendFile(`${resizedImgPath}.jpg`, options, (err) => {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent:', filename);
            }
        });
    }
    else {
        const isExistImages = yield (0, handleFile_1.isFileExist)(filename, "./images");
        if (!isExistImages) {
            res.send('Filename is not exist');
            return;
        }
        if (isNaN(parseInt(width)) ||
            isNaN(parseInt(height)) ||
            parseInt(width) <= 0 ||
            parseInt(height) <= 0) {
            res.send('Incorrect Parameters');
            return;
        }
        next();
    }
});
exports.default = logger;
