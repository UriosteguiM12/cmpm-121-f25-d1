import pizza from "./pizzaEmoji.png";
import mouse from "./ratEmoji.png";
import running from "./manRunning.png";
import building from "./buildingEmoji.png";
import truck from "./truck.png";
import robot from "./robot2.png";
import city from "./cityBackground.jpg";
import "./style.css";

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

// BG
document.body.style.backgroundImage = `url(${city})`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundAttachment = "fixed";
document.body.style.margin = "0";
document.body.style.height = "100vh";

// pizzaCounter
let pizzaCounter = 0;

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
  <div id="left-panel">
    <h1 id="game-title">Cheese & Conquest</h1>
    <div id="pizzaCounter-container">
      <p>Counter: <span id="pizzaCounter">0</span> pizzas</p>
      <p>per second: <span id="PPS">0</span></p>
    </div>
    <img src="${pizza}" id="pizzaButton" class="icon button-like" />
  </div>
  
  <div id="upgrades-container" class="scrollable">
    <div id="upgrades-row"></div>
  </div>

  <div id="pizza-rain-container"></div>
`;

const counterElement = document.getElementById("pizzaCounter")!;
const pizzasPerSecondDisplay = document.getElementById("PPS")!;
const pizzaButton = document.getElementById("pizzaButton") as HTMLImageElement;
const upgradesRow = document.getElementById("upgrades-row")!;
const pizzaRainContainer = document.getElementById("pizza-rain-container")!;
const miniPizzaSrc = pizza;

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

  // add click logic
  const button = document.getElementById(`${item.id}Button`)!;
  button.addEventListener("click", () => {
    const price = calculatePrice(item.baseCost, item.owned);
    if (pizzaCounter >= price) {
      pizzaCounter -= price;
      item.owned += 1;
    }
  });
});

// Functions
function calculatePrice(base: number, owned: number): number {
  return base * Math.pow(1.15, owned);
}

function calculatePizzasPerSecond(): number {
  return availableItems.reduce((sum, item) => sum + item.owned * item.rate, 0);
}

// Animation loop
let lastTime = performance.now();
function update(currentTime: number) {
  // Calculate delta time
  const deltaSeconds = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Increment pizzaCounter based on PPS
  const currentPPS = calculatePizzasPerSecond();
  pizzaCounter += currentPPS * deltaSeconds;

  // Update pizzaCounter and PPS displays
  counterElement.textContent = pizzaCounter.toFixed(0);
  pizzasPerSecondDisplay.textContent = currentPPS.toFixed(2);

  // Enable/disable upgrade buttons based on pizzaCounter
  availableItems.forEach((item) => {
    const button = document.getElementById(
      `${item.id}Button`,
    ) as HTMLImageElement;
    const priceElement = document.getElementById(`${item.id}Price`)!;
    const ownedElement = document.getElementById(`${item.id}Owned`)!;

    const price = calculatePrice(item.baseCost, item.owned);
    priceElement.textContent = price.toFixed(2);
    ownedElement.textContent = item.owned.toString();

    if (pizzaCounter >= price) {
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
  pizzaCounter += 1;
  counterElement.textContent = pizzaCounter.toFixed(0);
});

function createMiniPizza() {
  const pizza = document.createElement("img");
  pizza.src = miniPizzaSrc;
  pizza.className = "mini-pizza";

  // Random side: left or right
  const side = Math.random() < 0.5 ? "left" : "right";
  pizza.style.left = side === "left"
    ? `${Math.random() * 40}px`
    : `${globalThis.innerWidth - 70 - Math.random() * 40}px`;

  pizza.style.top = `${-30}px`; // start above screen

  // Random falling speed and rotation
  const speed = 1 + Math.random() * 2; // pixels per frame
  const rotateSpeed = (Math.random() - 0.5) * 4; // degrees per frame
  let rotation = Math.random() * 360;

  const amplitude = 5 + Math.random() * 5; // horizontal wobble in px
  const wobbleSpeed = 0.05 + Math.random() * 0.05; // wobble speed
  let wobbleOffset = Math.random() * Math.PI * 2;

  pizzaRainContainer.appendChild(pizza);

  function fall() {
    let currentY = parseFloat(pizza.style.top);
    if (currentY > globalThis.innerHeight) {
      pizza.remove();
      return;
    }

    // move down
    currentY += speed;
    pizza.style.top = `${currentY}px`;

    // rotate
    rotation += rotateSpeed;
    pizza.style.transform = `rotate(${rotation}deg) translateX(${
      Math.sin(wobbleOffset) * amplitude
    }px)`;
    wobbleOffset += wobbleSpeed;

    requestAnimationFrame(fall);
  }

  requestAnimationFrame(fall);
}

// Spawn pizzas continuously
setInterval(createMiniPizza, 200);
