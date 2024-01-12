import baseUrl from "../services/base-url";

export const register = async ({ name, password, email }, setResult) => {
  try {
    await baseUrl
      .post("/user/register", {
        name,
        password,
        email,
      })
      .then((res) => {
        const { success, message } = res.data;
        setResult({
          success,
          message,
        });
      })
      .catch((err) => {
        const { success, message } = err.response.data;
        setResult({
          success,
          message,
        });
      });
  } catch (err) {
    alert("Something went wrong");
  }
};

export const login = async ({ email, password }, dispatch) => {
  try {
    await baseUrl
      .post("/user/login", {
        email,
        password,
      })
      .then((res) => {
        const { message, accessToken, data } = res.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: { data, message, accessToken } });
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch({ type: "LOGIN_FAILED", payload: message });
      });
  } catch (err) {
    alert("Opps! Something went wrong");
  }
};

export const logout = (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    alert("Opps! Something went wrong");
  }
};
