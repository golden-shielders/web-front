export default function activateScripts(container: HTMLElement) {
  const scripts = Array.from(container.querySelectorAll("script"));

  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    for (const { name, value } of Array.from(oldScript.attributes)) {
      newScript.setAttribute(name, value);
    }
    newScript.textContent = oldScript.textContent;

    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
}
