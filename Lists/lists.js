import { checkAuth, fetchListItem, logout, togglePurchased } from '../fetch-utils.js';
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
        window.location.href = '/Lists';
    } else {
        error.textContent = 'Something went wrong :(';
    }
});

async function displayListItems() {
    itemList.textContent = '';
    const lists = await fetchListItem();
    if (lists) {
        for (let list of lists) {
            const listDiv = renderItem(list);
            listDiv.addEventListener('click', async (e) => {
                e.preventDefault();
                await togglePurchased(list);
                displayListItems();
            });
            itemList.append(listDiv);
        } 
    } else {
        error.textContent = 'Oops, something went wrong :(';
    }
}
displayListItems();

//     for (let list of lists) {
//         const listDiv = renderItem(list);
//         itemList.append(listDiv);
//     }
// }
// loadData();

// async function displayListItems() {
//     itemList.textContent = '';
//     const data = await fetchListItem();
//     if (data) {
//         for (let list of lists {
//             const listEl = renderItem(list);
//             listEl.addEventListener('click', async (e) => {
//                 e.preventDefault();
//                 await togglePurchased(item);
//                 displayList