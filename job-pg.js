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
function showJobDetails() {
    var id = getParameterByName('id');
    console.log(id);

    const databaseRef1 = firebase.database().ref('/jobs/' + id);
    var databaseRef3 = firebase.database().ref('/users');

    // Fetch job details
    databaseRef1.once('value').then(function(snapshot) {
        var jobData = snapshot.val();
        var jobDetailsDiv = document.getElementById('job-details');

        // Display job details
        jobDetailsDiv.innerHTML = `
            <p>Title: ${jobData.title}</p>
            <p>Experience: ${jobData.experience}</p>
            <p>Pay Grade: ${jobData.payGrade}</p>
            <p>Producer/Username: ${jobData.producerUsername || jobData.username}</p>
        `;

        // Fetch phone number using the producer's username
        var producerUsername = jobData.producerUsername || jobData.username;
        databaseRef3.orderByChild('username').equalTo(producerUsername).once('value').then(function(userSnapshot) {
            var user = userSnapshot.val();
            if (user) {
                var phone = user[Object.keys(user)[0]].phone;
                var email= user[Object.keys(user)[0]].email;
                console.log(email);
                // Make the phone number clickable
                jobDetailsDiv.innerHTML += `<p>Phone no: <a href="tel:${phone}">${phone}</a></p>`;
                jobDetailsDiv.innerHTML += `<p>Email: <a href="mailto:${email}">${email}</a></p>`;
                //   jobDetailsDiv.innerHTML += <p>Phone no: <a href="tel:${phone}">${phone}</a></p>;
                // jobDetailsDiv.innerHTML += <p>Email: <a href="mailto:${email}">${email}</a></p>;
            }
        });
    });
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", function() {
    showJobDetails();
});