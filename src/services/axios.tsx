import axios from "axios";

export const f1Client = axios.create({
  baseURL: "https://api.openf1.org/v1",
});
