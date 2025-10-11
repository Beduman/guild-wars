export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadHeaderFooter() {
  //header populate
  const headerTemplate = await loadTemplate('partials/header.html');
  const headerElement = document.querySelector('#header');
  renderWithTemplate(headerTemplate, headerElement);

  //footer populate
  const footerTemplate = await loadTemplate('partials/footer.html');
  const footerElement = document.querySelector('#footer');
  renderWithTemplate(footerTemplate, footerElement);
}

loadHeaderFooter();