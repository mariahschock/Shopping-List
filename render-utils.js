export function renderItem(item) {
    const div = document.createElement('div');
    div.textContent = `${item.qty} ${item.item}`;

    if (item.purchased) {
        div.classList.add('complete');
    }
    return div;
}