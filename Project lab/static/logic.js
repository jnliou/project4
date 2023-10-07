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
function toggleChoice(imgElement) {
   let isClicked = imgElement.getAttribute('data-clicked') === 'true';
   imgElement.setAttribute('data-clicked', !isClicked);
   imgElement.style.opacity = isClicked ? "1" : "0.5";
}

function submitChoices() {
   let choices = [];
   let images = document.querySelectorAll('.s3-image');
   images.forEach(img => {
       if (img.getAttribute('data-clicked') === 'true') {
           choices.push(img.getAttribute('data-category'));
       }
   });

   fetch('/submit_choices', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ 'choices': choices })
   })
   .then(response => response.json())
   .then(data => {
       alert(`You got ${data.correct_count} out of 5 correct!`);
       updateScores(data.scores);
   });
}

function updateScores(scores) {
   let scoresDiv = document.getElementById('scores');
   scoresDiv.innerHTML = "Scores: " + scores.join(", ");
}