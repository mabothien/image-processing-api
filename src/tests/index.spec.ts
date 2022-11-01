import axios from 'axios'

describe('SERVER RUNNING', () => {
  let server: { close: () => void };
  beforeAll(() => {
    server = require('../index');
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    it('Status 200', (done) => {
      axios.get("http://localhost:8000/api/images?filename=fjord&width=500&height=200").then((response) =>{
        expect(response.status).toBe(200); 
      })
      done();
    });
  });
});