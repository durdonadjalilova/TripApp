export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://nameless-journey-52794.herokuapp.com";
};
