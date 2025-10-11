import pizza from "./pizzaEmoji.png";
import "./style.css";

// Create a counter
let counter: number = 0;

// Create a button that has a background image (like in cookie clicker)
document.body.innerHTML = `
  <img src="${pizza}" id="pizzaButton" class="icon button-like" />
  <p>Counter: <span id="counter">0</span> pizza slices</p>
`;

const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;
const counterElement = document.getElementById("counter")!;

// Determine frame rate
let start = performance.now();

function update(end: number) {
  const seconds = (end - start) / 1000;
  console.log(seconds);
  start = end;

  counter += seconds;
  counterElement.textContent = counter.toFixed(0);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Click logic
pizzaButton.addEventListener("click", () => {
  console.log("Pizza made!");
  counter += 1;
  counterElement.innerHTML = counter.toString();
});
