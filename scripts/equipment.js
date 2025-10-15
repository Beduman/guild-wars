import { characters, items } from './utils.js';

function fetchData(url) {
    const connectionurl = url;
    return fetch(connectionurl).then(response => response.json());
}

//display the characters
function displayCharacters(data, container) {
    if (!Array.isArray(data)) {
        container.textContent = 'No items found.';
        return;
    }
    if (data.length === 0) {
        container.textContent = 'No items in array.';
        return;
    }
    const itemlist = data.map(o => {
        return `<li class="selectcharacter" dataname="${o}"><strong>${o}</strong></li>`;
    }).join('');
    container.innerHTML = `<ul>${itemlist}</ul>`;
    // Add click event listeners to each character
    container.querySelectorAll('.selectcharacter').forEach(c => {
        c.addEventListener('click', function() {
            const charactername = this.getAttribute('dataname');
            fetchItems(charactername);
        });
    });
}

// display the items of the character
async function displayItems(data, container) {
    if (!Array.isArray(data.equipment)) {
        container.textContent = 'No items found.';
        return;
    }
    if (data.equipment.length === 0) {
        container.textContent = 'No items in array.';
        return;
    }
    // Fetch item details
    const itemIds = data.equipment.map(o => o.id);
    const url = `${items}?ids=${itemIds.join(',')}`;
    const itemdata = await fetchData(url);


    // display each item
    const itemlist = itemdata.map(o => {
        const title = o.name || o.title || `name ${o.id}`;
        const type = o.type ? ` <em>(${o.type})</em>` : '';
        const level = o.level ? ` <strong>Level: ${o.level}</strong>` : '';
        const rarity = o.rarity ? ` <strong>Rarity: ${o.rarity}</strong>` : '';
        const desc = o.description ? ` — ${o.description}` : '';
        const icon = o.icon ? `<img src="${o.icon}" alt="${title} icon" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">` : '';
        return `<li>${icon}<strong>${title}</strong>${desc}${type}${level}${rarity}</li>`;
    }).join('');

    container.innerHTML = `<ul>${itemlist}</ul>`;
    
}

async function fetchCharacters() {
    const data = await fetchData(characters + localStorage.getItem('accesstoken'));
    const container = document.getElementById('characterlist');
    if (!container) return;

    displayCharacters(data, container);
}

async function fetchItems(charactername) {
    const data = await fetchData(`${characters}/${encodeURIComponent(charactername)}/equipment${localStorage.getItem('accesstoken')}`);
    const container = document.getElementById('itemlist');
    if (!container) return;

    displayItems(data, container);
}


document.addEventListener('DOMContentLoaded', fetchCharacters);