document.addEventListener("DOMContentLoaded", function() {
  const firebaseConfig = {
      // Your Firebase configuration
      apiKey: "AIzaSyDAYyEyaQhiZGd-7lRBYNbTXv_8uc_S1-8",
    authDomain: "retro-craft-hub.firebaseapp.com",
    databaseURL: "https://retro-craft-hub-default-rtdb.firebaseio.com",
    projectId: "retro-craft-hub",
    storageBucket: "retro-craft-hub.appspot.com",
    messagingSenderId: "668766099424",
    appId: "1:668766099424:web:f418f8e06bb13548bd3d85",
    measurementId: "G-KREF1HV8PX"

  };
  
  firebase.initializeApp(firebaseConfig);
  
  const database = firebase.database();
  const storageRef = firebase.storage().ref();
  var databaseRef = database.ref('/users');
  
  function main_register(event) {
      event.preventDefault();
  
      var phone = document.getElementById("authForm").elements["phone"].value;
      var username = document.getElementById("authForm").elements["username"].value;
      var email = document.getElementById("authForm").elements["email"].value;
      var password = document.getElementById("authForm").elements["password"].value;
      var userType = document.getElementById("authForm").elements["userType"].value;
      var profilePictureInput = document.getElementById('profilePicture');
      var description = document.getElementById('authForm').elements["description"].value;
  
      // Check if a file is selected
      if (profilePictureInput.files.length > 0) {
          var profilePicture = profilePictureInput.files[0];
          var imageRef = storageRef.child('profilePictures/' + profilePicture.name);
  
          imageRef.put(profilePicture).then(function(snapshot) {
              console.log('Image uploaded successfully in storage module!');
  
              imageRef.getDownloadURL().then(function(imageUrl) {
                  databaseRef.child(username).set({
                      password: password,
                      profilePicture: imageUrl,
                      userType: userType,
                      username: username,
                      phone: phone,
                      email: email,
                      description: description
                  }).then(function() {
                      localStorage.setItem("loggedInUsername", username);
                      if (userType === 'hire') {
                          window.location.href = "HirePOV.html";
                      } else if (userType === 'freelancer') {
                          window.location.href = "FreelancePOV.html";
                      }
                      console.log('Data stored in the realtime database!');
                  }).catch(function(error) {
                      console.error('Error storing data in the realtime database:', error.message);
                  });
              }).catch(function(error) {
                  console.error('Error getting image download URL:', error.message);
              });
          }).catch(function(error) {
              console.error('Error uploading image to storage:', error.message);
          });
      } else {
          console.error('No file selected for profile picture.');
      }
  }
  
  document.getElementById("authForm").addEventListener("submit", function(event) {
      main_register(event);
  });
});