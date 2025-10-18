import pizza from "./pizzaEmoji.png";
import mouse from "./ratEmoji.png";
import running from "./manRunning.png";
import building from "./buildingEmoji.png";
import truck from "./truck.png";
import robot from "./robot2.png";
import city from "./cityBackground.jpg";
import "./style.css";

// BG
document.body.style.backgroundImage = `url(${city})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";
document.body.style.margin = "0";
document.body.style.height = "100vh";

// Counter
let counter = 0;

// Interface
interface Item {
  id: string;
  name: string;
  baseCost: number;
  rate: number;
  emoji: string;
  flavor: string;
  owned: number;
}

const availableItems: Item[] = [
  {
    id: "mouse",
    name: "Rat Recruit",
    baseCost: 10,
    rate: 0.1,
    emoji: mouse,
    flavor: "They’re not pets. They’re interns.",
    owned: 0,
  },
  {
    id: "run",
    name: "Delivery Goon",
    baseCost: 100,
    rate: 2,
    emoji: running,
    flavor: "Wears a stained uniform. Doesn’t ask questions. Delivers.",
    owned: 0,
  },
  {
    id: "building",
    name: "Rat HQ",
    baseCost: 1000,
    rate: 50,
    emoji: building,
    flavor: "Now with clipboard. Now with benefits. Now in charge of you.",
    owned: 0,
  },
  {
    id: "truck",
    name: "Night Truck",
    baseCost: 10000,
    rate: 100,
    emoji: truck,
    flavor: "Runs on cheese. Smells like regret. Only active at night.",
    owned: 0,
  },
  {
    id: "robot",
    name: "Cyber-Rat",
    baseCost: 50000,
    rate: 1000,
    emoji: robot,
    flavor: "Consciousness is overrated. But cheddar? Cheddar is eternal.",
    owned: 0,
  },
];

// HTML
document.body.innerHTML = `
  <div id="counter-container">
    <p>Counter: <span id="counter">0</span> pizzas</p>
    <p>per second: <span id="PPS">0</span></p>
  </div>
  <img src="${pizza}" id="pizzaButton" class="icon button-like" />
  <div class="icon-row" id="upgrades-row"></div>
`;

const counterElement = document.getElementById("counter")!;
const PPS_Element = document.getElementById("PPS")!;
const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;
const upgradesRow = document.getElementById("upgrades-row")!;

// Look through each upgrade and put them on the screen
availableItems.forEach((item) => {
  const div = document.createElement("div");
  div.className = "upgrade";
  div.innerHTML = `
    <p>${item.name}</p>
    <img src="${item.emoji}" id="${item.id}Button" class="icon button-like" />
    <p>Price: <span id="${item.id}Price">${item.baseCost.toFixed(2)}</span></p>
    <p>Owned: <span id="${item.id}Owned">0</span></p>
    <p>Each produces ${item.rate} PPS</p>
    <p class="upgrade-flavor">${item.flavor}</p>
  `;
  upgradesRow.appendChild(div);
});

// Functions
function calculatePrice(base: number, owned: number): number {
  return base * Math.pow(1.15, owned);
}

function calculatePPS(): number {
  return availableItems.reduce((sum, item) => sum + item.owned * item.rate, 0);
}

// Animation loop
let lastTime = performance.now();
function update(currentTime: number) {
  // Calculate delta time
  const deltaSeconds = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Increment counter based on PPS
  const currentPPS = calculatePPS();
  counter += currentPPS * deltaSeconds;

  // Update counter and PPS displays
  counterElement.textContent = counter.toFixed(0);
  PPS_Element.textContent = currentPPS.toFixed(2);

  // Enable/disable upgrade buttons based on counter
  availableItems.forEach((item) => {
    const button = document.getElementById(
      `${item.id}Button`,
    ) as HTMLImageElement;
    const priceElement = document.getElementById(`${item.id}Price`)!;
    const ownedElement = document.getElementById(`${item.id}Owned`)!;

    const price = calculatePrice(item.baseCost, item.owned);
    priceElement.textContent = price.toFixed(2);
    ownedElement.textContent = item.owned.toString();

    if (counter >= price) {
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
    } else {
      button.style.pointerEvents = "none";
      button.style.opacity = "0.5";
    }
  });

  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// Click logic
pizzaButton.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toFixed(0);
});

availableItems.forEach((item) => {
  const button = document.getElementById(`${item.id}Button`)!;
  button.addEventListener("click", () => {
    const price = calculatePrice(item.baseCost, item.owned);
    if (counter >= price) {
      counter -= price;
      item.owned += 1;
    }
  });
});
