import { checkAuth, fetchListItem, logout } from '../fetch-utils.js';
import { createListItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const itemList = document.getElementById('list');

logoutButton.addEventListener('click', () => {
    logout();
});

const form = document.querySelector('.item');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemData = new FormData(form);
    const data = await createListItem(itemData.get('item'), itemData.get('qty'));
    if (data) {
        return data;
    } else {
        error.textContent = 'Something went wrong :(';
    }
});

async function loadData() {
    const lists = await fetchListItem();
    for (let list of lists) {
        const listDiv = renderItem(list);
        itemList.append(listDiv);
    }
}
loadData();