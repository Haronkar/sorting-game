import "./style.css";
import { addClick, setInnerHTML } from "./modules/utils";

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

const containers = new Map();
let selectedElement: HTMLElement | null = null;
const colors = ["R", "G", "G", "R", "G", "R"];
const noOfContainers = 3;

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
  if (filled.size === 2 && empty.size === 1) {
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

  if (toStack && fromStack && toStack.size() < 3) {
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

function initialize() {
  for (let i = 1; i <= noOfContainers; i++) {
    const c = new Stack();
    if (i < noOfContainers) {
      c.push(colors.pop() || "");
      c.push(colors.pop() || "");
      c.push(colors.pop() || "");
    }

    containers.set(`container${i}`, c);
  }

  // const c1 = new Stack();
  // const c2 = new Stack();
  // const c3 = new Stack();

  // c1.push("R");
  // c1.push("G");
  // c1.push("G");
  // c2.push("R");
  // c2.push("G");
  // c2.push("R");

  // containers.set("container1", c1);
  // containers.set("container2", c2);
  // containers.set("container3", c3);

  addClick("#container3", (event) => containerClick(event));
  addClick("#container2", (event) => containerClick(event));
  addClick("#container1", (event) => containerClick(event));

  updateDOM();
}

initialize();
console.log(containers);
