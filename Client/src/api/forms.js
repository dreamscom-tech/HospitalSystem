import axios from "axios";

const url = "https://hospitalplus.dreamscom.tech/api";

export default class FormsApi {
  async post(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }
}
