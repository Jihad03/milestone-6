const searchBooks = () => {
  // Getting search string value
  let searchString = document.getElementById("search-string");
  loadData(searchString.value);
  searchString.value = "";

  // loading indicator turning on
  document.getElementById("loading").classList.remove("d-none");
  document.getElementById("results-found").classList.add("d-none");
  document.getElementById("books").textContent = "";
};

// Load Data
const loadData = async (searchString) => {
  // Fetch Data
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${searchString}`
  );
  const data = await response.json();

  // Loading indicator turning off
  document.getElementById("loading").classList.add("d-none");
  document.getElementById("results-found").classList.remove("d-none");

  // Accessing data to display
  const bookData = data.docs;

  // processing to display
  displayData(data, bookData);
};

// Display Data
const displayData = (data, bookData) => {
  const resultsFound = data.numFound;
  document.getElementById(
    "results-found"
  ).innerText = `Total Results: 100 of ${resultsFound}`;
  const booksContainer = document.getElementById("books");
  bookData.forEach((singleBook) => {
    const bookTitle = singleBook.title;
    const author = singleBook.author_name
      ? singleBook.author_name[0]
      : "404 :(";
    const publisher = singleBook.publisher ? singleBook.publisher[0] : "404 :(";
    const publishDate = singleBook.publish_date
      ? singleBook.publish_date[0]
      : "404 :(";
    booksContainer.innerHTML += `<div class='p-3 border border-2 rounded w-25 mx-2 mb-2 text-center'>
    <h2 class='fs-5'>${bookTitle}</h2>
    <p>Author: ${author}</p>
    <p>Publisher: ${publisher}</p>
    <p>Published: ${publishDate}</p>
    </div>`;
  });
};
