// save function
const saveToBookmark = e => {
  // prevent form from submitting
  e.preventDefault();

  const siteName = document.querySelector('#site-name').value;
  const siteUrl = document.querySelector('#site-url').value;
  const bookmark = {
    name: siteName,
    url: siteUrl
  }

  // save to localStorage
  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear field
  document.querySelector('form').reset();

  // refetch bookmarks
  fetchBookmarks();
}

// fetch bookmark
const fetchBookmarks = () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmarked = document.querySelector('#bookmarked');

  bookmarked.innerHTML = '';

  bookmarks.map(bookmark => {
    bookmarked.innerHTML += `
    <div class="bookmarked-item">
    <h3 class="bookmarked-name">${bookmark.name}</h3>
    <a class="bookmarked-url" href="${bookmark.url}" target="_blank">Visit</a>
    <button onclick="deleteBookmark(\'${bookmark.url}\')" class="delete"><i class="fas fa-trash"></i></button>
    </div>
    `
  })
};

// delete bookmark
const deleteBookmark = url => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  bookmarks.map((bookmark, index) => {
    if (bookmark.url === url) bookmarks.splice(index, 1);
  });

  localStorage.setItem('bookmarks',
    JSON.stringify(bookmarks));

  // refetch bookmarks
  fetchBookmarks();

}

window.addEventListener('load', fetchBookmarks);
document.querySelector('form').addEventListener('submit', saveToBookmark);