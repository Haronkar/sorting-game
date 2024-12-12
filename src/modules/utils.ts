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
