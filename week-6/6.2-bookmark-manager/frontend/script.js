const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    //   start here
    fetchBookmarks();
});

// Fetch bookmarks from the backend
async function fetchBookmarks() {
    //  start here
    try {
        const response = await fetch(API_URL);
        const bookmarks = await response.json();
        bookmarks.forEach(bookmark => {
            addBookmarkToDOM(bookmark);
        });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
    }
}

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
    //  start here
    const bookmarkList = document.getElementById('bookmark-list');
    const bookmarkItem = document.createElement('li');
    bookmarkItem.classList.add('bookmark-item');
    bookmarkItem.setAttribute('data-id', bookmark.id);

    const url = document.createElement('span');
    url.textContent = `${bookmark.url} (${bookmark.category})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteBookmark(bookmark.id);
    });

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteButton);

    bookmarkList.appendChild(bookmarkItem);
}

// Add a new bookmark
document.getElementById('add-todo-btn').addEventListener('click', async () => {
    //  start here
    const urlInput = document.getElementById('bookmark-url');
    const categoryInput = document.getElementById('bookmark-category');

    if (!urlInput || !categoryInput || urlInput.value.trim() === '' || categoryInput.value.trim() === '') {
        console.error('Please enter a URL and category');
        return;
    }

    const newBookmark = {
        url: urlInput.value,
        category: categoryInput.value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBookmark)
        });

        if (response.ok) {
            const createdBookmark = await response.json();
            addBookmarkToDOM(createdBookmark);
            urlInput.value = '';
            categoryInput.value = '';
        } else {
            console.error('Failed to create bookmark:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error creating bookmark:', error);
    }

});

// Delete a bookmark
async function deleteBookmark(id) {
    //  start here;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const bookmarkItem = document.querySelector(`[data-id="${id}"]`);
            bookmarkItem.remove();
        } else {
            console.error('Failed to delete bookmark:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting bookmark:', error);
    }
}