export function addClick(selector: string, fn: (event: MouseEvent) => void) {
  document
    .querySelector<HTMLDivElement>(selector)!
    .addEventListener("click", (event) => fn(event));
}

export function setInnerHTML(selector: string, text: string) {
  document.querySelector<HTMLDivElement>(selector)!.innerHTML = text;
}
