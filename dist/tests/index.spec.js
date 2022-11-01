"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
describe('SERVER RUNNING', () => {
    let server;
    beforeAll(() => {
        server = require('../index');
    });
    afterAll(() => {
        server.close();
    });
    describe('GET', () => {
        const data = {
            status: 0
        };
        // beforeAll((done) => {
        //   // axios.get(
        //   //   'http://localhost:8000/api/images?filename=fjord&width=500&height=200',
        //   //   (_, response: Response) => {
        //   //     data.status = response.statusCode;
        //   //     done();
        //   //   }
        //   // );
        // });
        it('Status 200', (done) => {
            axios_1.default.get("http://localhost:8000/api/images?filename=fjord&width=500&height=200").then((response) => {
                expect(response.status).toBe(200);
            });
            done();
        });
    });
});
