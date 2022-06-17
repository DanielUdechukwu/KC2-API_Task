let postHolder = document.querySelector("#post-holder");
let postForm = document.querySelector("#post-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");
// let del = document.querySelector("#delete");


// For GETting posts
let postBox = [];

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data = data) => {console.log(data)
    postBox = data.splice(0,20);
    render(postBox);

  })
}

getPosts();

// For POSTing posts
postForm.addEventListener("submit", create);

function create(event) {
  console.log(body.value, title.value)
  event.preventDefault();
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      userId: 2,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => response.json())
    .then((data) => { console.log(data)

      postBox.unshift(data)
      render(postBox);

    });

}

// For UPDATING posts

function updatePost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 2,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    let postTitle = document.querySelectorAll("#post-title");
    let postBody = document.querySelectorAll("#post-body");

    postTitle.forEach((postTitle, index) => {
      if (index +1 === id){
        if(data.title !== " "){
          postTitle.innerHTML = data.title
        }
      }
    })

    postBody.forEach((postBody, index) => {
      if (index +1 === id){
        if(data.body !== " "){
          postBody.innerHTML = data.body
        }
      }
    })

      
  });

}


// For DELETING posts

function deletePost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
  })
  .then((response) => response.json())
  .then((data) => {
    postBox = postBox.filter(post => post.id !== id)
    render(postBox);
  })
}


// For VIEWING posts

function viewPost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("viewedPost", JSON.stringify(data))
      window.location.href = `./update/update.html?id=${id}`
    })
}




function render(myArr){
  let postWrapper = " ";
    postBox.forEach(post => {
      postWrapper += `
      <div class="col-lg-6 col-md-12 pb-4">
      <div class="card border border-2 rounded-3">
        <div class="card-body py-5 px-4">
          <h3 class="mb-5 fw-bold" id="post-title">${post.title}</h3>
          <p id="post-body">${post.body}</p>

          <div class="d-flex justify-content-end" style="gap: 1rem;">
            <button class="" id="view" onclick="viewPost(${post.id})">
              <i class="fa-regular fa-eye" style="font-size: 2rem;"></i>
            </button>
            <button class="" id="update" onclick="updatePost(${post.id})">
            <i class="fa-solid fa-arrows-rotate" style="font-size: 2rem;"></i>
            </button>
            <button class="" id="delete" onclick="deletePost(${post.id})"> 
            <i class="fa-regular fa-trash-can" style="font-size: 2rem;"></i>
            </button>
          </div>
          <p class="fw-bold">${post.id}</p>
        </div>
      </div>
    </div>
      `
    });
      postHolder.innerHTML = postWrapper;
}