import { itemstats } from './utils.js';

function fetchData(url, id) {
    const connectionurl = url + id;
    return fetch(connectionurl).then(response => response.json());
}

function displayData(data, container) {
    if (!Array.isArray(data)) {
        container.textContent = 'No items found.';
        return;
    }
    if (data.length === 0) {
        container.textContent = 'No items in array.';
        return;
    }
    const statlist = data.map(o => {
        const name = o.name || o.title || `name ${o.id}`;
        const attributes = o.attributes.map(a => a.attribute).join(', ');

        return `<li><strong>${name}</strong> <li class="sublist">(${attributes})</li></li>`;
    }).join('');

    container.innerHTML = `<ul>${statlist}</ul>`;
}

async function fetchItems() {
    const data = await fetchData(itemstats, '?ids=all');
    const container = document.getElementById('itemlist');
    if (!container) return;

    displayData(data, container);
}

document.addEventListener('DOMContentLoaded', fetchItems);