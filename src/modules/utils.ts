export class Stack {
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
    let str = "";
    for (const i of this.stack) str += i + " ";
    return `[ ${str}]`;
  }
}

export function addClick(selector: string, fn: (event: MouseEvent) => void) {
  document
    .querySelector<HTMLDivElement>(selector)!
    .addEventListener("click", (event) => fn(event));
}

export function setInnerHTML(selector: string, text: string) {
  document.querySelector<HTMLDivElement>(selector)!.innerHTML = text;
}

export function addContainer(id: string) {
  let parent = document.querySelector<HTMLDivElement>("#app");
  const ctn = document.createElement("div");
  ctn.setAttribute("id", id);

  parent?.appendChild(ctn);
}
