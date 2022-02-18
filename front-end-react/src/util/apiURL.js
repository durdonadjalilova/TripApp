export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://boiling-beach-73479.herokuapp.com";
};
