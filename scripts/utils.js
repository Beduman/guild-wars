export const wizardsvault = 'https://api.guildwars2.com/v2/wizardsvault/objectives';

export const mywizardsvaultdaily = 'https://api.guildwars2.com/v2/account/wizardsvault/daily';

export const mywizardsvaultweekly = 'https://api.guildwars2.com/v2/account/wizardsvault/weekly';

export const itemstats = 'https://api.guildwars2.com/v2/itemstats';

export const items = 'https://api.guildwars2.com/v2/items';

export const characters = 'https://api.guildwars2.com/v2/characters';

export const accesstoken = localStorage.getItem('accesstoken');

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

