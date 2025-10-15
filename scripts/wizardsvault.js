import { wizardsvault, mywizardsvaultdaily, mywizardsvaultweekly } from './utils.js';

function fetchData(url, id) {
    const connectionurl = url + id;
    return fetch(connectionurl).then(response => response.json());
}

function displayData(data, container) {
    if (!Array.isArray(data)) {
        if (Array.isArray(data.objectives)) {
            data = data.objectives;
        } else {
            container.textContent = 'No objectives found.';
            return;
        }
    }
    const items = data.map(o => {
        const title = o.name || o.title || `Objective ${o.id}`;
        const type = o.type ? ` <em>(${o.type})</em>` : '';
        const desc = o.description ? ` — ${o.description}` : '';
        const acclaim = o.acclaim ? ` <strong>Acclaim: ${o.acclaim}</strong>` : '';
        return `<li><strong>${title}</strong>${type}${desc}${acclaim}</li>`;
    }).join('');

    container.innerHTML = `<ul>${items}</ul>`;
}

//this is for all the objectives, not account related
async function fetchWizardsVaultData() {
    const data = await fetchData(wizardsvault, '?ids=all');
    const container = document.getElementById('objectives');
    if (!container) return;

    displayData(data, container);
}

//this is for the account related objectives
async function fetchMyWizardsVaultDaily() {
    const data = await fetchData(mywizardsvaultdaily, localStorage.getItem('accesstoken'));
    const container = document.getElementById('myobjectivesdaily');
    if (!container) return;

    displayData(data, container);
}

async function fetchMyWizardsVaultWeekly() {
    const data = await fetchData(mywizardsvaultweekly, localStorage.getItem('accesstoken'));
    const container = document.getElementById('myobjectivesweekly');
    if (!container) return;

    displayData(data, container);
}

document.addEventListener('DOMContentLoaded', fetchWizardsVaultData);
document.addEventListener('DOMContentLoaded', fetchMyWizardsVaultDaily);
document.addEventListener('DOMContentLoaded', fetchMyWizardsVaultWeekly);