axios.get('https://localhost:44396/api/Users/UserSelect')
.then(function(response) {
  console.log(response.data);
  response.data.forEach(function(item) {
    console.log(item.id);
    document.getElementById('ad').innerHTML += item.name_ + '<br>';
    document.getElementById('soyad').innerHTML += item.surname_ + '<br>';
    document.getElementById('tarix').innerHTML += item.birthdate + '<br>';
    document.getElementById('img').src = item.photo_;

  });
})
.catch(function(error) {
  console.log(error);
});
