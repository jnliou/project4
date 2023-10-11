// refresh.js

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
loadButton.addEventListener('click', function () {
   // Show the image container
   imageContainer.style.display='flex';
});


//Add data clicking
function toggleChoice(imageElement, inputId) {
    let inputElement = document.getElementById(inputId);
    
    // Toggle the image's appearance (optional, for example, you could change its border to indicate selection)
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
        
        // Clear existing table rows except for the header
        let table = document.getElementById("scoresTable").getElementsByTagName('tbody')[0];
        table.innerHTML = "";
        
        // Append scores from the entire score history
        data.scores.forEach(score => {
            let newRow = table.insertRow();
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            cell1.innerHTML = score.User;
            cell2.innerHTML = score.Model;
        });
        updateTotals();

        
    });
}

function updateTotals() {
    let table = document.getElementById("scoresTable").getElementsByTagName('tbody')[0];
    let userTotal = 0;
    let modelTotal = 0;

    // Iterate through each row in the table and sum up the scores
    for (let i = 0; i < table.rows.length; i++) {
        userTotal += parseInt(table.rows[i].cells[0].innerText);
        modelTotal += parseInt(table.rows[i].cells[1].innerText);
    }

    // Append or update the totals in the table
    let totalRow;
    if (document.getElementById("totalsRow")) {
        totalRow = document.getElementById("totalsRow");
    } else {
        totalRow = table.insertRow();
        totalRow.id = "totalsRow";
        totalRow.insertCell(0);
        totalRow.insertCell(1);
    }

    totalRow.cells[0].innerText = userTotal;
    totalRow.cells[1].innerText = modelTotal;

    totalRow.cells[0].style.fontWeight = 'bold';
    totalRow.cells[1].style.fontWeight = 'bold';
}    
    





function updateScores(scores) {
   let scoresDiv = document.getElementById('scores');
   scoresDiv.innerHTML = "Scores: " + scores.join(", ");
}


function revealAnswers() {
    let answers = document.querySelectorAll(".actual-answer");
    answers.forEach(answer => {
        answer.style.display = "block";
    });
    // Optionally, you can hide the "Reveal" button after clicking
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
