import "./style.css";

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
  isEmpty() {
    return this.stack.length == 0;
  }
  printStack() {
    let str = "";
    for (const i of this.stack) str += i + " ";
    return `${str}`;
  }
}

function handleClick() {
  // value = container.pop();
  console.log("BAJHSBD");
}

let value: string | undefined = "None";

const container = new Stack();
container.push("B");
container.push("C");
container.push("A");
container.push("D");
container.push("F");

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div onClick="${handleClick()}">
  ${container.isEmpty()}
  </div>
  <div>
  ${container.printStack()}
  </div>
  <div>
  ${value}
  </div>
`;
