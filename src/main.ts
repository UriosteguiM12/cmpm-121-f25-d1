import pizza from "./pizzaEmoji.png";
import mouse from "./ratEmoji.png";
import running from "./manRunning.png";
import building from "./buildingEmoji.png";
import city from "./cityBackground.jpg";
import "./style.css";

// Set background image
document.body.style.backgroundImage = `url(${city})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";
document.body.style.margin = "0";
document.body.style.height = "100vh";

// Create counters
let counter: number = 0;
let mouseCounter: number = 0;
let runCounter: number = 0;
let buildingCounter: number = 0;

document.body.innerHTML = `
  <p>Counter: <span id="counter">0</span> pizzas</p>
  <p>per second: <span id="PPS">0</span></p>
  <img src="${pizza}" id="pizzaButton" class="icon button-like" />
  <div class="icon-row">
    <div class="upgrade">
      <img src="${mouse}" id="mouseButton" class="icon button-like" />
      <p>Price: <span id="mousePrice">10</span></p>
      <p>Owned: <span id="mouseOwned">0</span></p>
    </div>
    <div class="upgrade">
      <img src="${running}" id="runButton" class="icon button-like" />
      <p>Price: <span id="runPrice">100</span></p>
      <p>Owned: <span id="runOwned">0</span></p>
    </div>
    <div class="upgrade">
      <img src="${building}" id="buildingButton" class="icon button-like" />
      <p>Price: <span id="buildingPrice">1000</span></p>
      <p>Owned: <span id="buildingOwned">0</span></p>
    </div>
  </div>
`;

// Grab elements
const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;
const mouseButton = document.getElementById("mouseButton") as HTMLButtonElement;
const runButton = document.getElementById("runButton") as HTMLButtonElement;
const buildingButton = document.getElementById(
  "buildingButton",
) as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const PPS_Element = document.getElementById("PPS")!;
const mouseOwned = document.getElementById("mouseOwned")!;
const runOwned = document.getElementById("runOwned")!;
const buildingOwned = document.getElementById("buildingOwned")!;
const mousePriceElement = document.getElementById("mousePrice")!;
const runPriceElement = document.getElementById("runPrice")!;
const buildingPriceElement = document.getElementById("buildingPrice")!;

// Disable upgrades initially
mouseButton.disabled = true;
runButton.disabled = true;
buildingButton.disabled = true;

// Function to calculate PPS based on upgrades
function calculatePPS(): number {
  return mouseCounter * 0.1 + runCounter * 2 + buildingCounter * 50;
}

function calculatePrice(base: number, owned: number): number {
  return base * Math.pow(1.15, owned);
}

// Animation loop
let lastTime = performance.now();
function update(currentTime: number) {
  const seconds = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Increment counter based on PPS
  const currentPPS = calculatePPS();
  counter += currentPPS * seconds;

  // Update counter and PPS displays
  counterElement.textContent = counter.toFixed(0);
  PPS_Element.textContent = currentPPS.toFixed(2);

  // Enable/disable upgrade buttons based on counter
  if (counter >= calculatePrice(10, mouseCounter)) {
    mouseButton.disabled = false;
    mouseButton.style.opacity = "1";
  } else {
    mouseButton.disabled = true;
    mouseButton.style.opacity = "0.5";
  }

  if (counter >= calculatePrice(100, runCounter)) {
    runButton.disabled = false;
    runButton.style.opacity = "1";
  } else {
    runButton.disabled = true;
    runButton.style.opacity = "0.5";
  }

  if (counter >= calculatePrice(1000, buildingCounter)) {
    buildingButton.disabled = false;
    buildingButton.style.opacity = "1";
  } else {
    buildingButton.disabled = true;
    buildingButton.style.opacity = "0.5";
  }

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// Click logic
pizzaButton.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toFixed(0);
});

mouseButton.addEventListener("click", () => {
  const price = calculatePrice(10, mouseCounter);
  if (counter >= price) {
    mouseCounter += 1;
    counter -= price;
    PPS_Element.textContent = calculatePPS().toFixed(2);
    mouseOwned.textContent = mouseCounter.toString();
    mousePriceElement.textContent = calculatePrice(10, mouseCounter).toFixed(2);
  }
});

runButton.addEventListener("click", () => {
  const price = calculatePrice(100, runCounter);
  if (counter >= price) {
    runCounter += 1;
    counter -= price;
    PPS_Element.textContent = calculatePPS().toFixed(2);
    runOwned.textContent = runCounter.toString();
    runPriceElement.textContent = calculatePrice(100, runCounter).toFixed(2);
  }
});

buildingButton.addEventListener("click", () => {
  const price = calculatePrice(1000, buildingCounter);
  if (counter >= price) {
    buildingCounter += 1;
    counter -= price;
    PPS_Element.textContent = calculatePPS().toFixed(2);
    buildingOwned.textContent = buildingCounter.toString();
    buildingPriceElement.textContent = calculatePrice(1000, buildingCounter).toFixed(2);
  }
});