import { wizardsvault } from './utils.js';

function fetchData(url, id) {
    const connectionurl = url + id;
    return fetch(connectionurl).then(response => response.json());
}

async function fetchWizardsVaultData() {
    const data = await fetchData(wizardsvault, '?ids=all');
    const container = document.getElementById('objectives');
    if (!container) return;

    if (!Array.isArray(data) || data.length === 0) {
        container.textContent = 'No objectives found.';
        return;
    }

    const items = data.map(o => {
        const title = o.name || o.title || `Objective ${o.id}`;
        const desc = o.description ? ` — ${o.description}` : '';
        const type = o.type ? ` <em>(${o.type})</em>` : '';
        const acclaim = o.acclaim ? ` <strong>Acclaim: ${o.acclaim}</strong>` : '';
        return `<li><strong>${title}</strong>${desc}${type}${acclaim}</li>`;
    }).join('');

    container.innerHTML = `
        <h2>Wizard's Vault Objectives</h2>
        <ul>${items}</ul>`;
}

document.addEventListener('DOMContentLoaded', fetchWizardsVaultData);