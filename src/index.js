let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toySection = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");
  const toysUrl = "http://localhost:3000/toys";

  //Fetch Toys
  function getToys(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => renderToys(data));
  }
  //Render Toys
  function renderToys(toys) {
    toys.forEach((toy) => {
      //create toy card elements
      const toyCard = document.createElement("div");
      const h2 = document.createElement("h2");
      const img = document.createElement("img");
      const likes = document.createElement("p");
      const likeButton = document.createElement("button");
      //assign to toy card elements including classed with predefined styles
      toyCard.classList.add("card");
      h2.textContent = toy.name;
      img.classList.add("toy-avatar");
      img.src = toy.image;
      likes.textContent = ` ${toy.likes} likes`;
      likeButton.classList.add("like-btn");
      likeButton.textContent = "like";
      likeButton.setAttribute("id", toy.id);
      toyCard.appendChild(h2);
      toyCard.appendChild(img);
      toyCard.appendChild(likes);
      toyCard.appendChild(likeButton);
      toySection.appendChild(toyCard);


 // Fetch update on Likes
 function updateLikes(id, likes) {
  const config = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({ likes: likes += 1 }),
  };
  return fetch(`http://localhost:3000/toys/${id}`, config);
}

  // Event listener for like button
  likeButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateLikes(toy.id, toy.likes)
  .then(() => {
    // Update the likes in the DOM
    likes.textContent += 1;
    toy.likes + parseInt(likes.textContent) ;
  })   
});
});
   
  
  }
  //Post Toys callback function
  function postToys(name, image, likes) {
    const formData = {
      name: name,
      image: image,
      likes: 0,
    };
    const submitToy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    };

    return fetch(toysUrl, submitToy)
   .then((response) => response.json())
   .then((data) => console.log(data))
   .then((newToy) => {
    console.log(newToy);
    const id = newToy.id;
    h2.textContent = newToy.name;
    img.src = newToy.image;
    likes.textContent = ` ${newToy.likes} likes`;
    likes.textContent = ` ${toy.likes} likes`;
    toyCard.appendChild(h2);
    toyCard.appendChild(img);
    toyCard.appendChild(likes);
    toyCard.appendChild(likeButton);
   })
   
  }
  //Event Listener for Post Toys
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
 postToys(e.target.name.value, e.target.image.value, 0);
  });
  //Event Listener for Add Toy Button Toggle
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys(toysUrl);
});
