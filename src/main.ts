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

const c1 = new Stack();
const c2 = new Stack();
const c3 = new Stack();

const containers = new Map([
  ["container1", c1],
  ["container2", c2],
  ["container3", c3],
]);
// containers.set("container3", new Stack());
// containers.clear();
// console.log(containers);
c1.push("R");
c1.push("G");
c1.push("G");
c2.push("R");
c2.push("G");
c2.push("R");

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="b">
  ${c1.isEmpty()}
  </div>
  <div id="container1">
  </div>
  <div id="container2">
  </div>
  <div id="container3">
  </div>
`;

const handleClick = () => {
  console.log(c2.peak());
};

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
let selectedElement: HTMLElement | null = null;

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

  if (toStack?.isEmpty() || fromStack?.peak() == toStack?.peak()) {
    toStack?.push(fromStack?.pop() || "");
    updateDOM();
    checkWinCondition();
    selectedElement = null;
  } else selectedElement = null;
}
function elementToStack(ele: HTMLElement) {
  const id = ele.getAttribute("id") ?? "";
  return containers.get(id);
}

updateDOM();

addClick("#b", handleClick);
addClick("#container3", (event) => containerClick(event));
addClick("#container2", (event) => containerClick(event));
addClick("#container1", (event) => containerClick(event));
