import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { UtilsContext } from "@/context/UtilsContext";

export const useApi = () => {
  const { VITE_API_URL } = import.meta.env;
  const { authorization } = useContext(UserContext);
  const { setShowSnackbar, setSnackbar } = useContext(UtilsContext);

  const getWithAuthorization = async (url) => {
    const apiUrl = `${VITE_API_URL}${url}`; //ya incluye slash
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authorization.token,
      },
    });
    const data = await response.json();
    return data;
  };

  const postWithoutAuthorization = async (url, body) => {
    try {
      const apiUrl = `${VITE_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //saber de que tipo viene el body
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      setSnackbar({
        message: error.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  const postWithAuthorization = async (url, body) => {
    const apiUrl = `${VITE_API_URL}${url}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: authorization.token,
        "Content-Type": "application/json", //saber de que tipo viene el body
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };

  return { getWithAuthorization, postWithoutAuthorization };
};
