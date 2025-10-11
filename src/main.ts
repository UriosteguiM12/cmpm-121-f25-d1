import pizza from "./pizzaEmoji.png";
import "./style.css";

// Create a button that has a background image (like in cookie clicker)
document.body.innerHTML = `
  <img src="${pizza}" id="pizzaButton" class="icon button-like" />
`;

const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;

pizzaButton.addEventListener("click", () => {
  console.log("Pizza made!");
});
