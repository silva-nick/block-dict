import axios from "axios";
const querystring = require("querystring");

const api = axios.create();

//export const getCharByChar = (char) => api.get(`/char/${char}`);
export const getDefsByChars = (charList) =>
  api.post(`api/dictionary`, querystring.stringify(charList));

const apis = { getDefsByChars };

export default apis;
