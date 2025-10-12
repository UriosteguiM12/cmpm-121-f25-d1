import pizza from "./pizzaEmoji.png";
import mouse from "./ratEmoji.png";
import "./style.css";

// Create a counter
let counter: number = 0;
let upgradeCounter: number = 0;

// Create a button that has a background image (like in cookie clicker)
document.body.innerHTML = `
  <img src="${pizza}" id="pizzaButton" class="icon button-like" />
  <img src="${mouse}" id="mouseButton" class = "icon button-like" />
  <p>Counter: <span id="counter">0</span> pizzas</p>
`;

const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;
const mouseButton = document.getElementById("mouseButton") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;

mouseButton.disabled = true;

// Determine frame rate
let start = performance.now();

function update(end: number) {
  const seconds = (end - start) / 1000;
  start = end;

  counter += seconds * upgradeCounter;
  counterElement.textContent = counter.toFixed(0);

  if (counter >= 10) {
    mouseButton.disabled = false;
    mouseButton.style.opacity = "1";
  } else {
    mouseButton.disabled = true;
    mouseButton.style.opacity = "0.5";
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Click logic
pizzaButton.addEventListener("click", () => {
  console.log("Pizza made!");
  counter += 1;
  counterElement.innerHTML = counter.toString();
});
mouseButton.addEventListener("click", () => {
  if (counter > 10) {
    upgradeCounter += 1;
    counter -= 10;
  }
});
