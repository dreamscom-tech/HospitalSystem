import { Base64 } from "js-base64";
const token = localStorage.getItem("token");
const tokenFrom = token ? JSON.parse(Base64.decode(token)) : null;
const user = {
  user: {
    user: "Xamuel",
    user_role: "doctor",
  },
};
// const user = {
//   user: tokenFrom ? tokenFrom : {},
// };

export default user;
