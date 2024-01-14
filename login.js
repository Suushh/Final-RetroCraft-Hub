// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
      //login function to verify database
    function checker() {
      var username= document.getElementById("username").value;
      var password= document.getElementById("password").value;
      
  
      const usersRef = firebase.database().ref("users");
  
  
  
      usersRef.orderByChild('username').equalTo(username).once("value")
          .then(snapshot => {
          
            const user = snapshot.val();
            console.log(user);
            var storedPassword = user[Object.keys(user)[0]].password;
           var userType= user[Object.keys(user)[0]].userType;
           localStorage.setItem("loggedInUsername",username);
          
  
            
           
  
            if ((storedPassword - password)===0 ) {
              if(userType === 'hire') {
             
              window.location.href = "HirePOV.html";
              }
              else if(userType === "freelancer") {
                window.location.href ="FreelancePOV.html";
              }
            } else {
              alert('oops wrong  password');
            }
          })
          .catch(error => {
            alert("Email not found");
            console.error("Error fetching user data:", error);
          });
   }


  