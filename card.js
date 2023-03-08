// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmSXQwDHFXbCPch8W0cXAw8UIMrn6KnlQ",
  projectId: "login-firebase-483e7",
  storageBucket: "gs://login-firebase-483e7.appspot.com",
  messagingSenderId: "722448566691",
  appId: "1:722448566691:android:e1fd6476c55b9719167216"
};
firebase.initializeApp(firebaseConfig);




axios.get('https://localhost:44396/api/Users/UserSelect')
.then(function(response) {
  console.log(response.data);
  response.data.forEach(function(item) {
    console.log(item.id);

    // Create a new card div for each item
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Create a new image element and set the source to the item's photo URL
    const img = document.createElement('img');
    img.src = item.photo_;
    cardDiv.appendChild(img);

    // Create a new div element for the name and append the name to it
    const nameDiv = document.createElement('div');
    nameDiv.innerHTML = item.name_;
    cardDiv.appendChild(nameDiv);

    // Create a new div element for the surname and append the surname to it
    const surnameDiv = document.createElement('div');
    surnameDiv.innerHTML = item.surname_;
    cardDiv.appendChild(surnameDiv);

    // Create a new div element for the birthdate and append the birthdate to it
    const birthdateDiv = document.createElement('div');
    birthdateDiv.innerHTML = item.birthdate;
    cardDiv.appendChild(birthdateDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = 'x';
    cardDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click",()=>{
      // Send a DELETE request to the server using the ID of the item to be deleted
      axios.delete(`https://localhost:44396/api/Users/DeleteUser?id=` + item.id).then(() => {
        console.log("User deleted from server");
        const storage = firebase.storage();
        const photoRef = storage.refFromURL(item.photo_);
        location.reload(); 
        photoRef.delete().then(() => {
          console.log("Photo deleted from Firebase Storage");
        }).catch((error) => {
          console.log(error);
          location.reload(); // Reload the page even if the photo delete failed
        });
      });
    });

    // Append the card div to the parent element on the page
    document.getElementById('card').appendChild(cardDiv);
  });
})
.catch(function(error) {
  console.log(error);
});
