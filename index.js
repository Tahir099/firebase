const firebaseConfig = {
    apiKey: "AIzaSyCmSXQwDHFXbCPch8W0cXAw8UIMrn6KnlQ",
    projectId: "login-firebase-483e7",
    storageBucket: "gs://login-firebase-483e7.appspot.com",
    messagingSenderId: "722448566691",
    appId: "1:722448566691:android:e1fd6476c55b9719167216"
  };
  

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();
const fileInput = document.getElementById("fileInput");
const adInput = document.getElementById("adInput");
const tarixInput = document.getElementById("tarixInput");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  const file = fileInput.files[0];
  const ad = adInput.value
  const soy = soyInput.value
  const tarix = tarixInput.value

  const fileName = file.name;
  const fileRef = storageRef.child(fileName);

  fileRef.put(file).then((snapshot) => {
    console.log("File uploaded successfully");

    fileRef.getDownloadURL().then((url) => {
      console.log("File URL:", url);
      axios.post('https://localhost:44396/api/Users/AddUser', {

        photo_: url,
        name_: ad,
        surname_:soy,
        birthdate: tarix
        

      })
      .then(response => {
        console.log(response.data);
        location.reload();
      })
      .catch(error => {
        console.log(error);
      })

    });
  });
});
