import "./style.css";
import { addClick, addContainer, setInnerHTML, Stack } from "./modules/utils";

let selectedContainer: HTMLElement | null = null;
let tempSelectedContainer: HTMLElement | null = null;
const containers = new Map();

const colors = ["R", "G", "B", "P", "Y", "V", "I", "O"];
const noOfColors = 3; // max of 7
const constainerSize = 4;
const noOfContainers = noOfColors + 2;

// Selects random colors from colors array and
// fill the each color [noOfColors] times in the array
const selectedColors = [...colors]
  .sort(() => 0.5 - Math.random())
  .slice(0, noOfColors)
  .flatMap((c) => Array(constainerSize).fill(c));
const colorArray = sortArrayRandom([...selectedColors]);

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

// Check if the arrays are equal, forward and backward
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
`;

// Manage all the win conditions
function checkWinCondition() {
  const filled = new Map(
    Array.from(containers).filter(
      ([key, value]) => value.size() > 2 && value.allEqual()
    )
  );
  const empty = new Map(
    Array.from(containers).filter(([key, value]) => value.size() == 0)
  );
  if (
    filled.size === noOfColors &&
    empty.size === noOfContainers - noOfColors
  ) {
    setInnerHTML("#b", "Win");
  }
}

function updateDOM() {
  for (const [key, value] of containers.entries()) {
    setInnerHTML(`#${key}`, value.printStack());
  }
}

// onclick function
function containerClick(event: MouseEvent) {
  const clickedContainer = event.target as HTMLElement;

  checkSelected(clickedContainer);
}

// Manage selected container
function checkSelected(element: HTMLElement) {
  if (selectedContainer == null) {
    selectedContainer = element;
    tempSelectedContainer = selectedContainer;
    selectedContainer.classList.add("selected");
    return;
  }
  if (selectedContainer === element) {
    selectedContainer = null;
    tempSelectedContainer?.classList.remove("selected");
    return;
  }

  swapSelected(selectedContainer, element);
}

// So much happening here,
// but basically transfer elemets from one stack to another
function swapSelected(from: HTMLElement, to: HTMLElement) {
  // getting the correct stacks
  const fromStack = elementToStack(from);
  const toStack = elementToStack(to);

  // Checks if stacks are not null and transfer is possible
  if (toStack && fromStack && toStack.size() < constainerSize) {
    // Another check if transfer is possible
    // this mainly ensures that the stack it is transfering to is not empty
    // and has the same element that is being transfered
    if (fromStack.peak() == toStack.peak() || toStack.isEmpty()) {
      let pop: string;
      // This makes sure that if the top elements are same transfer them all
      do {
        pop = fromStack.pop();
        toStack.push(pop || "");
      } while (pop == fromStack.peak() && toStack.size() < constainerSize);

      tempSelectedContainer = selectedContainer;
      tempSelectedContainer?.classList.remove("selected");

      selectedContainer = null; // reset the selected container after the swap is sucessful
    } else {
      tempSelectedContainer = selectedContainer;
      tempSelectedContainer?.classList.remove("selected");
      selectedContainer = null;
    } // reset the selected container after swap is not sucessful
    updateDOM();
    checkWinCondition();
  } else {
    tempSelectedContainer = selectedContainer;
    tempSelectedContainer?.classList.remove("selected");
    selectedContainer = null;
  }
}

// Finds the correct stack from the list with the help of id
function elementToStack(ele: HTMLElement) {
  const id = ele.getAttribute("id") ?? "";
  return containers.get(id);
}

// Create a <div> with approprite id's
// Add click event to the said <div>
function createContainer() {
  for (let i = 1; i <= noOfContainers; i++) {
    addContainer(`container${i}`);
    addClick(`#container${i}`, (event) => containerClick(event));
  }
}
// Setting up the game
// creating and populating containers
// updating the visuals
function initialize() {
  createContainer();

  for (let i = 1; i <= noOfContainers; i++) {
    const c = new Stack();
    if (i <= noOfColors) {
      for (let i = 0; i < constainerSize; i++) {
        c.push(colorArray.pop() || "");
      }
    }

    containers.set(`container${i}`, c);
  }

  updateDOM();
}

initialize();
