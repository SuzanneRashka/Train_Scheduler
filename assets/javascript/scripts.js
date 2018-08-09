$(document).ready(function () {


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

        var timeFrequency = snapVal.frequency;
        var trainTime = snapVal.trainTime;
        var trainTimeConverted = moment(trainTime, "HH:MM").subtract(1, "years");
        console.log(trainTimeConverted);

        var currentTime = moment();
        var currentTimeConverted = moment(currentTime).format("hh:mm");
        console.log("currentTimeConverted = " + currentTimeConverted);

        var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("difference is: " + timeDiff);

        var timeModulus = timeDiff % timeFrequency;
        console.log("timeModulus : " + timeModulus);

        var timeTillTrain = timeFrequency - timeModulus;
        console.log("minutes til train" + timeTillTrain);

        var nextTrain = moment().add(timeTillTrain, "minutes");
        console.log("arrival time = " + moment(nextTrain).format("hh:mm"));

        var nameEle = $("<td>").text(snapVal.trainName);
        var destEle = $("<td>").text(snapVal.destination);
        var timeEle = $("<td>").text(snapVal.trainTime);
        var freqEle = $("<td>").text(snapVal.freq);
        var etaEle = $("<td>") + timeTillTrain;
        var nextTrainEle = $("<td>") + nextTrain;

        //adding td elements to tableRow
        var tableRow = $("<tr>");

        tableRow
            .append(nameEle)
            .append(destEle)
            .append(timeEle)
            .append(freqEle)
            .append(etaEle)
            .append(nextTrainEle);


        $("#table-body").append(tableRow);

    });

    $("#submit").on("click", function (event) {

        event.preventDefault();

        var formName = $("#train-name").val().trim();
        var formDest = $("#destination").val().trim();
        var formTime = $("#train-time").val().trim();
        var formFreq = $("#freq").val().trim();
        console.log(formName, formDest, formTime, formFreq);

        database.ref().push({
            trainName: formName,
            destination: formDest,
            trainTime: formTime,
            freq: formFreq,
        });

        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#freq").val("");

    });


}) // end document.ready