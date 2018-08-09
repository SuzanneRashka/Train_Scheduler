var config = {
    apiKey: "AIzaSyCFrRLT1rQdbkUz0jjkehSIRAgiN-FJaLA",
    authDomain: "trainscheduler-3d8be.firebaseapp.com",
    databaseURL: "https://trainscheduler-3d8be.firebaseio.com",
    projectId: "trainscheduler-3d8be",
    storageBucket: "",
    messagingSenderId: "760293447307"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// variables

// initial load
database.ref().on("child_added", function (snapshot) {

    var snapVal = snapshot.val();

    var tableRow = $("<tr>");

    var nameEle = $("<td>").text(snapVal.trainName);
    var destEle = $("<td>").text(snapVal.destination);
    var timeEle = $("<td>").text(snapVal.trainTime);
    var freqEle = $("<td>").text(snapVal.freq);

    //adding td elements to tableRow

    tableRow
        .append(nameEle)
        .append(destEle)
        .append(timeEle)
        .append(freqEle);

    $("#table-body").append(tableRow);

});

$("#submit").on("click", function () {
    var formName = $("#train-name").val().trim();
    var formDest = $("#destination").val().trim();
    var formTime = $("#train-time").val().trim();
    var formFreq = $("#freq").val().trim();

    console.log(formName, formDest, formTime, formFreq);

    database.ref().push({
        trainName: formName,
        destination: formDest,
        trainTime: formTime,
        freq: formFreq
    });
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#freq").val("");
});