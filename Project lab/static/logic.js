// refresh.js


let myPieChart; // global variable

// Get a reference to the button element by its id
const refreshButton = document.getElementById('refreshButton');

// Add a click event listener to the button
refreshButton.addEventListener('click', function () {
   // Use the location.reload() method to refresh the page
   location.reload(true);
});



var loadButton = document.getElementById('loadButton');
var imageContainer = document.getElementById('image-container');

// Add a click event listener to the button
// loadButton.addEventListener('click', function () {
//    // Show the image container
//    imageContainer.style.display='flex';
// });


//Add data clicking
function toggleChoice(imageElement, inputId) {
    let inputElement = document.getElementById(inputId);
    
    // Toggle the image's appearance
    if (inputElement.value == '0') {
        imageElement.style.border = "3px solid red";  // Visually mark the image
        inputElement.value = '1';
    } else {
        imageElement.style.border = "none";  // Reset visual marking
        inputElement.value = '0';
    }
}


function submitChoices() {
    let choices = [];
    let inputs = document.querySelectorAll("input[type='hidden']");
    // Disable the button immediately after it's clicked
    let submitButton = document.querySelector("#submitButton");
    submitButton.disabled = true;
    
    inputs.forEach((input) => {
        choices.push(parseInt(input.value));
    });
    let answers = document.querySelectorAll(".actual-answer");
    answers.forEach(answer => {
        answer.style.display = "block";
    });
    let prediction = document.querySelectorAll(".predict-answer");
    prediction.forEach(prediction => {
        prediction.style.display = "block";
    });

    fetch('/submit_choices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({choices: choices})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("You got: " + data.correct_count_user + " Correct!!" );  

        

        createPieChart(data.userTotal, data.modelTotal);
        createPieChart2(data.userTotal, data.counts-data.userTotal);
        createPieChart3(data.modelTotal, data.counts-data.modelTotal);

    });
}


    
// function updatePieChart(userTotal, modelTotal) {
//     var ctx = document.getElementById('myPieChart').getContext('2d');
    
//     // Check if there's an existing chart instance and destroy it to avoid the 'canvas already in use' error
//     if (myPieChartInstance) {
//         myPieChartInstance.destroy();
//     }

//     myPieChartInstance = new Chart(ctx, {
//         type: 'pie',
//         data: {
//             labels: ['User', 'Model'],
//             datasets: [{
//                 data: [userTotal, modelTotal],
//                 backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
//             }]
//         }
//     });
// }





function updateScores(scores) {
   let scoresDiv = document.getElementById('scores');
   scoresDiv.innerHTML = "Scores: " + scores.join(", ");
}



function revealAnswers() {
    let answers = document.querySelectorAll(".actual-answer");
    answers.forEach(answer => {
        answer.style.display = "block";
    });
    //you can hide the "Reveal" button after clicking
    document.getElementById("revealButton").style.display = "none";
}


let clearTableButton = document.getElementById('clearTableButton');
clearTableButton.addEventListener('click', function() {
    // Get the table element
    let scoresTable = document.getElementById('scoresTable');
    
    // Clear the table content. This will remove all rows except the headers
    scoresTable.getElementsByTagName('tbody')[0].innerHTML = '';

    
    alert('Table cleared successfully!');
});



document.getElementById('clearSessionButton').addEventListener('click', function() {
    fetch('/clear_session', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'session cleared') {
            alert('Session cleared successfully');
            
            location.reload();
        } else {
            alert('Session cleared successfully');
        }
    });
});

function createPieChart(userTotal, modelTotal) {
    let data = [{
        values: [userTotal, modelTotal],
        labels: ['User', 'Model'],
        type: 'pie'
    }];

    let layout = {
        title: 'User vs Model Scores',
        height: 400,
        width: 500,
        font: {
            family: 'Courier New, monospace',
            size: 20,
            color: '#000'
        },

    };
    var pie_chart_div = document.getElementById('pie-chart')
    Plotly.newPlot(pie_chart_div, data, layout);
}

function createPieChart2(userTotal, counts) {
    let data = [{
        values: [userTotal, counts],
        labels: ['Correct', 'Wrong'],
        type: 'pie',
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }];

    let layout = {
        title: 'User Accuracy',        
        height: 400,
        width: 500,
        paper_bgcolor: 'rgba(7,44,7,0.8)',
        font: {
            family: 'Courier New, monospace',
            size: 20,
            color: '#000',            
        },
    };

    var pie_chart_div = document.getElementById('pie-chart2')
    Plotly.newPlot(pie_chart_div, data, layout);
}

function createPieChart3(modelTotal, counts) {
    let data = [{
        values: [modelTotal,counts],
        labels: ['Correct', 'Wrong'],
        type: 'pie'
    }];

    let layout = {
        title: 'Model Accuracy',
        height: 400,
        width: 500,
        paper_bgcolor: 'lightgray',
        font: {
            family: 'Courier New, monospace',
            size: 20,
            color: '#000'
        },
        

    };
    var pie_chart_div = document.getElementById('pie-chart3')
    Plotly.newPlot(pie_chart_div, data, layout);
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var bot = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
bot.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

