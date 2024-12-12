import "./style.css";
import { addClick, addContainer, setInnerHTML } from "./modules/utils";

class Stack {
  stack: string[];
  constructor() {
    this.stack = [];
  }
  push(element: string) {
    this.stack.push(element);
  }
  pop() {
    if (this.stack.length === 0) return "underflow";
    return this.stack.pop();
  }
  peak() {
    if (this.isEmpty()) return;
    return this.stack[this.stack.length - 1];
  }
  isEmpty() {
    return this.stack.length == 0;
  }
  allEqual() {
    return this.stack.every((val) => val == this.stack[0]);
  }
  size() {
    return this.stack.length;
  }
  printStack() {
    // debuging
    let str = "";
    for (const i of this.stack) str += i + " ";
    return `[ ${str}]`;
  }
}

let selectedElement: HTMLElement | null = null;
const containers = new Map();
const noOfColors = 3; // max of 7
const constainerSize = 4;
const noOfContainers = noOfColors + 1;

const colors = ["R", "G", "B", "P", "Y", "V", "I", "O"];
const selectedColors = [...colors]
  .sort(() => 0.5 - Math.random())
  .slice(0, noOfColors)
  .flatMap((c) => Array(constainerSize).fill(c));
const colorArray = sortArrayRandom([...selectedColors]);

console.log(selectedColors, colorArray);

function sortArrayRandom(arr: string[]) {
  const temp = [...arr];
  while (areEqual(arr, temp)) {
    for (let i = arr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[randomIndex]] = [temp[randomIndex], temp[i]]; // Swap elements
    }
  }
  return temp;
}

function areEqual(arr1: string[], arr2: string[]) {
  return (
    (arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])) ||
    arr1.every((value, index) => value === arr2.reverse()[index])
  );
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="b">
  </div>
  <div id="container1">
  </div>
  <div id="container2">
  </div>
  <div id="container3">
  </div>
`;

function checkWinCondition() {
  const filled = new Map(
    Array.from(containers).filter(
      ([key, value]) => value.size() > 2 && value.allEqual()
    )
  );
  const empty = new Map(
    Array.from(containers).filter(([key, value]) => value.size() == 0)
  );
  if (filled.size === constainerSize - 1 && empty.size === 1) {
    setInnerHTML("#b", "Win");
  }
}

function updateDOM() {
  for (const [key, value] of containers.entries()) {
    setInnerHTML(`#${key}`, value.printStack());
  }
}

function containerClick(event: MouseEvent) {
  const clickedContainer = event.target as HTMLElement;

  checkSelected(clickedContainer);
}

function checkSelected(element: HTMLElement) {
  if (selectedElement == null) {
    selectedElement = element;
    return;
  }
  if (selectedElement === element) {
    selectedElement = null;
    return;
  }
  swapSelected(selectedElement, element);
}
function swapSelected(from: HTMLElement, to: HTMLElement) {
  const fromStack = elementToStack(from);
  const toStack = elementToStack(to);

  if (toStack && fromStack && toStack.size() < constainerSize) {
    if (fromStack.peak() == toStack.peak() || toStack.isEmpty()) {
      toStack.push(fromStack.pop() || "");
      updateDOM();
      checkWinCondition();
      selectedElement = null;
    } else selectedElement = null;
  }
}
function elementToStack(ele: HTMLElement) {
  const id = ele.getAttribute("id") ?? "";
  return containers.get(id);
}

function createContainer() {
  for (let i = 1; i <= noOfContainers; i++) {
    addContainer(`container${i}`);
    addClick(`#container${i}`, (event) => containerClick(event));
  }
}

function initialize() {
  createContainer();

  for (let i = 1; i <= noOfContainers; i++) {
    const c = new Stack();
    if (i < noOfContainers) {
      for (let i = 0; i < constainerSize; i++) {
        c.push(colorArray.pop() || "");
      }
    }

    containers.set(`container${i}`, c);
  }

  // addClick("#container3", (event) => containerClick(event));
  // addClick("#container2", (event) => containerClick(event));
  // addClick("#container1", (event) => containerClick(event));

  updateDOM();
}

initialize();
