document.addEventListener("DOMContentLoaded", function() {
   
  showjobs();
});

if (!firebase.apps.length) {
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
}


const database =  firebase.app().database();
const storageRef = firebase.storage().ref();
const databaseRef = database.ref('/users');
var getusername = localStorage.getItem("loggedInUsername");
var databaseRef1 = database.ref('/jobs');
var items = databaseRef1.items;
var datacontainer= document.getElementById("datacontainer");




var isVisible=true;
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
       
       <img src="${profilePictureUrl}" alt="Profile Picture" style = "width : 200px ; height :200px">
     `;
     datacontainer.style.display = isVisible ? "block" : "none";
     isVisible = !isVisible;
    });
}

function showjobs() {

        databaseRef1.once('value').then(function(snapshot) {
          
          var jobData = snapshot.val();

          
          var jobTitlesDiv = document.getElementById('box');

          for (var key in jobData) {
              if (jobData.hasOwnProperty(key)) {
                  var item = jobData[key];

                  var jobURL = "job-pg.html?id=" + encodeURIComponent(key);

                
                  var jobLink = document.createElement('a');
                  jobLink.href = jobURL;
                  jobLink.textContent = item.title+"-"+item.username;
                  jobLink.style.display = 'block'; 
                  jobTitlesDiv.appendChild(jobLink);}

      }
      
});
}
function showExperienceInput() {
var experienceInput = document.getElementById('check');
var checkButton = document.getElementById('check-button');

experienceInput.style.display = 'block';
checkButton.style.display = 'block';
}





function showjobsonexperience() {
var experience3=document.getElementById('check').value;

databaseRef1.once('value').then(function(snapshot) {

var jobData = snapshot.val();


var jobTitlesDiv = document.getElementById('box');

jobTitlesDiv.innerHTML='';
for (var key in jobData) {
if (jobData.hasOwnProperty(key)) {
var item = jobData[key];
console.log(item.experience);
console.log(experience3);


if (parseInt(item.experience) <= parseInt(experience3)) {


var jobURL = "job-pg.html?id=" + encodeURIComponent(key);


var jobLink = document.createElement('a');
jobLink.href = jobURL;
jobLink.textContent = item.title + "-" + item.username;
jobLink.style.display = 'block'; 
jobTitlesDiv.appendChild(jobLink);
}
}
}
});
}
function showjobsonpaygrade( )
{
var paygrade4=document.getElementById('check1').value;
console.log(paygrade4);
databaseRef1.once('value').then(function(snapshot) {

var jobData = snapshot.val();


var jobTitlesDiv = document.getElementById('box');

jobTitlesDiv.innerHTML='';
for (var key in jobData) {
if (jobData.hasOwnProperty(key)) {
var item = jobData[key];


if (parseInt(item.payGrade) <= parseInt(paygrade4)) {


var jobURL = "job-pg.html?id=" + encodeURIComponent(key);


var jobLink = document.createElement('a');
jobLink.href = jobURL;
jobLink.textContent = item.title + "-" + item.username;
jobLink.style.display = 'block'; 
jobTitlesDiv.appendChild(jobLink);
}
}
}
});


}
function prompt1()
{
const payrange=  prompt('enter the pay you would like');
localStorage.setItem("pay-range",payrange);
payrange1(payrange);
}
function logout()
{
window.location.href="index.html";
}
function showPayGradeInput()
{
var paygradeInput = document.getElementById('check1');
var checkButton = document.getElementById('check-button1');

paygradeInput.style.display = 'block';
checkButton.style.display = 'block';
}

