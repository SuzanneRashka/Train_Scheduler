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
    //************************** 
    // Frequency converted in hours/minutes
    var timeFrequency = parseInt(snapVal.freq);
    var convFreqTimeHours = Math.floor(timeFrequency / 60);
    var convFreqTimeMinutes = timeFrequency % 60;
    var convFreq = convFreqTimeHours + "h " + convFreqTimeMinutes + " m";
    //if less than 60 minutes, hours do not show
    if (convFreqTimeHours === 0) {
      convFreq = convFreqTimeMinutes + " m";
    }
    //**************************

    var currentTime = moment();
    var trainTime = snapVal.trainTime;
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var timeDiff = currentTime.diff(trainTimeConverted, "minutes");
    var timeModulus = timeDiff % timeFrequency;
    var timeTillTrain = timeFrequency - timeModulus;
    var nextTrain = currentTime.add(timeTillTrain, "minutes");

    //************************** 
    // time until next train converted in hours/minutes
    var timeTillConvertHours = Math.floor(timeTillTrain / 60);
    var timeTillConvertMinutes = timeTillTrain % 60;
    var timeTillConvert = timeTillConvertHours + "h " + timeTillConvertMinutes + " m";
    // if less than 60 minutes, hours do not show
    if (timeTillConvertHours === 0) {
      timeTillConvert = timeTillConvertMinutes + " m"
    } else if (timeTillConvertHours > 24) {
      timeTillConvertHours = Math.floor(timeTillConvertHours / 60);
    }
    // time until next train converted in days/weeks
    //****** Gteting too complicated.... to be continued later */
    // var timeTillConvertDays = timeTillConvertHours / 24;
    // var timeTillConvertWeeks = timeTillConvertDays / 7;
    // console.log("time" + timeTillConvertDays);
    //************************** 

    var nextTrainFormat = moment(nextTrain).format("HH:mm");

    var nameEle = $("<td>").text(snapVal.trainName);
    var destEle = $("<td>").text(snapVal.destination);
    var freqEle = $("<td>").text(convFreq);
    var nextTrainEle = $("<td>").text(nextTrainFormat);
    var etaEle = $("<td>").text(timeTillConvert);

    //adding td elements to tableRow
    var tableRow = $("<tr>");

    tableRow
      .append(nameEle)
      .append(destEle)
      .append(freqEle)
      .append(nextTrainEle)
      .append(etaEle);

    $("#table-body").append(tableRow);
  });

  $("#submit").on("click", function (event) {
    event.preventDefault();

    var formName = $("#train-name")
      .val()
      .trim();
    var formDest = $("#destination")
      .val()
      .trim();
    var formTime = $("#train-time")
      .val()
      .trim();
    var formFreq = $("#freq")
      .val()
      .trim();





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
    // }
  });
}); // end document.ready


//  attempts at validating inputs to come back to later

// also tried required in input tag, onSubmit function check()

// if (formName === " " || formName == null) {
//   $("#alertMessage").html("Do not leave this blank");
//   console.log("Form Name " + formName);
//   alert("Do not leave this blank");
// }

//  if (!formTime.includes(":")) {
//     make the message field visible
//     put text in the field saying they need to include a :
// } else if (!formName || !formDest check to make sure all               //        fields are filled in ) {
//        please fill in all fields
// } else {

// function check() {
//   var x = document.forms["trainForm"]["name"].value;
//   if (x == null || x == "") {
//     $("#alertMessage").html("Do not leave this blank");
//   }
// }