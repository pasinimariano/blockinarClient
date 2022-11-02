export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("access_token"));
    return token !== null ? token : "TokenInsexistente";
  }
};
