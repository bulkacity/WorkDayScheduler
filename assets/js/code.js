// the following line will call the function upon the opening of the page, utilizing jquery. note that the following is equivalant to $(document).ready(function() {}), this ensures that no functions are executed prior to the opening of the page( otherwise loadings will fail)
$(function() {}) ;
// the following line will declare variables

// declare variable utilizing moment api and format as shown in the example
var todaysDate = moment().format("dddd, MMMM Do") ;
// declare an instant point in time with respect to the current date and time
var instant = moment().format("dd H A");
var twentyFourhour= moment().format("H");

// Generate an array of times

var hourByhour = [];
var restOfDay = [];
var objectCounter=-1 ;
const objectsTimeSlots={};

// Here i will generate an arrary of objects that will be generated depending on the hours based on the current hour of the day. This will limit the amount of objects.
// for (var i = twentyFourhour; i <= 24; i++) {
          
//     var timeStamp = i+"00";
//     var timeStampFornmat=moment(timeStamp, "HH").format("h A");
//     console.log("time: " + timeStampFornmat) ;   
//     objectCounter++;
//     console.log(objectCounter)
//     hourByhour[objectCounter]=objectsTimeSlots[objectCounter] ={
//       time: timeStampFornmat,
//       event: "" 
//     };
    
// };

// I did not realize that i needed to keep track of previous rows, so i re-wrote

for (var i = 0; i <= 24; i++) {
          
    var timeStamp = i;
    var timeStampFornmat=moment(timeStamp, "HH").format("dd h A");
    console.log("time: " + timeStampFornmat) ;   
    objectCounter++;
    console.log(objectCounter)
    hourByhour[objectCounter]=objectsTimeSlots[objectCounter] ={
      time: timeStampFornmat,
      event: "" 
    };
    
};
restOfDay.push(objectsTimeSlots);
console.log(hourByhour);
console.log(restOfDay);
console.log(objectsTimeSlots);  //this turned to be what i needed

var workDayEvents = JSON.parse(localStorage.getItem("workDayOpened"));

if(workDayEvents){
    hourByhour=workDayEvents 
    console.log("workdayevents");
}

// The following line will add todays date under the header
$("#currentDay").text(todaysDate);

// Now each row will be created.
hourByhour.forEach(function(timeBlock,index){
    var timeLabel = timeBlock.time;
    var blockColor= colorRow(timeLabel);
    var rowEach =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
	
		$(".container").append(rowEach);
            
    
});

// The following will check against the times in respect to each other
function colorRow(time) {
	var planNow = moment(instant, "dd H A");
	var planEntry = moment(time, "dd H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// adding an event listener for the save button 
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	hourByhour[blockID].event = userEntry;

	// send the JSON file to the local storage.
	localStorage.setItem("workDayOpened", JSON.stringify(hourByhour));
});