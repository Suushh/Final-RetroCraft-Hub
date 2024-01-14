document.addEventListener("DOMContentLoaded", function() {
   
    showfreelancerprofile();
});


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
const storageRef = firebase.storage().ref();
var databaseRef = database.ref('/users');
var databaseRef1 = database.ref('/jobs');
var getusername = localStorage.getItem("loggedInUsername");
var datacontainer= document.getElementById("datacontainer");

var isVisible = true;
function profileshow() {
    var getusername = localStorage.getItem("loggedInUsername");
    const usersRef = firebase.database().ref("users");

    usersRef.orderByChild('username').equalTo(getusername).once("value")
        .then(snapshot => {

            const user = snapshot.val();

            var username = getusername;
            var userType = user[Object.keys(user)[0]].userType;

            var profilePictureUrl = user[Object.keys(user)[0]].profilePicture;

            console.log(userType);
            datacontainer.innerHTML = `
           <p>USERNAME: ${username}</p>
           <p>USERTYPE: ${userType}</p>
           
           <img src="${profilePictureUrl}" alt="Profile Picture" style= "width : 200px ;height :200px">
         `;
         datacontainer.style.display = isVisible ? "block" : "none";
         isVisible = !isVisible;
        });
}

function createJob(event) {
   
    event.preventDefault();
    const producerUsername = localStorage.getItem("loggedInUsername");

    var experience = document.getElementById("Job").elements["experience"].value;
    var payGrade = document.getElementById("Job").elements["payGrade"].value;
    var title = document.getElementById("Job").elements["title"].value;
    databaseRef1.child(getusername).set({
        experience: experience,
        payGrade: payGrade,
        title: title,
        username: getusername,
        type: "hire",
        
      }).then(function() {
        alert("Your job was created successfully!!");
        

      });


}

document.getElementById("Form").addEventListener("submit", function(event){
    createJob(event);
});
function showfreelancerprofile() {
    databaseRef.once('value').then(function (snapshot) {
        var freelanceprofile = snapshot.val();
        var jobTitlesDiv = document.getElementById('box');

        for (var key in freelanceprofile) {
            // if (freelanceprofile.hasOwnProperty(key)) {
                var item = freelanceprofile[key];
                
                // Check if userType exists and is 'freelancer'
                if (  item.userType!='hire') {
                    var jobURL = "profile-pg.html?id=" + encodeURIComponent(key);
                    var jobLink = document.createElement('a');
                    jobLink.href = jobURL;
                    jobLink.textContent = item.username;
                    jobLink.style.display = 'block';
                    jobTitlesDiv.appendChild(jobLink);
                // }
            }
        }
    });
}

function logout()
{
    window.location.href="home-pg.html";
}