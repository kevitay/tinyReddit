const submitForm = document.querySelector('#search-form');

const fetchRedditData = function (term) {

  let data = fetch(`https://www.reddit.com/r/${term}.json`)
    .then((data) => data.json())
    .catch(function (error) {
      console.log(error);
    })

    return data;  
};

const createListItem = function (post) {

  let newLi = document.createElement('li');
  newLi.innerHTML = `<h3><a href='https://www.reddit.com${post.data.permalink}' target='_new'>${post.data.title}</a></h3>
  <p>Author: <a href='https://www.reddit.com/user/${post.data.author}' target='_new'>${post.data.author}</a></p>`;
  document.querySelector('#search-results-list').appendChild(newLi);
  // console.log(`Title: ${post.data.title}\nAuthor: ${post.data.author}`);
  
};

const displayErrorAlert = function (error) {

  document.querySelector('#error-alert h3').innerText = error;
  document.querySelector('#error-alert').classList.remove('hidden');

}

submitForm.addEventListener('submit', function (e) {
  
  e.preventDefault();

  let searchTerm = document.querySelector('#search-bar').value;

  fetchRedditData(searchTerm).then(function (response) {
    console.clear();
    document.querySelector('#error-alert').classList.add('hidden');
    document.querySelector('#search-results-list').innerHTML = '';
    console.log(response);

    if (response === undefined) {

      let errorMessage = 'Error: Undefined';
      console.log(errorMessage);
      displayErrorAlert(errorMessage);

    } else if (response.error && response.message) {

      let errorMessage = `Error: ${response.error} ${response.message}`;
      console.log(errorMessage);
      displayErrorAlert(errorMessage);

    } else {

      let posts = response.data.children;
      for (let i = 0; i < posts.length; i++) {
        let currentPost = posts[i];
        createListItem(currentPost);
      }

    }
  });
});
