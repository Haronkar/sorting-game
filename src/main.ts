import "./style.css";

const container: string[] = ["A"];
container.push("B");

const value = container.pop();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  ${container.length == 0}
  </div>
`;
