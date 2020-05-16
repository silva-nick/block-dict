import axios from "axios";
const querystring = require("querystring");

const api = axios.create({
  baseURL: "http://localhost:3001/api/",
});

//export const getCharByChar = (char) => api.get(`/char/${char}`);
export const getCharByChar = (char) => api.get(`/char/${char}`);
export const getDefsByChars = (charList) =>
  api.post(`/dictionary`, querystring.stringify(charList));

const apis = { getCharByChar, getDefsByChars };

export default apis;
