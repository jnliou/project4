// stars.js

function createStars() {
    const starCount = 100; // Adjust as needed
    const container = document.querySelector('.starry-background');
 
    for (let i = 0; i < starCount; i++) {
       const star = document.createElement('div');
       star.className = 'star';
       container.appendChild(star);
    }
 }
 
 createStars(); // Call the function to create stars
 
 // Animate stars falling down
 const stars = document.querySelectorAll('.star');
 stars.forEach((star) => {
    const duration = Math.random() * 5 + 2; // Random duration for animation (2-7 seconds)
    const delay = Math.random() * 5; // Random delay (0-5 seconds)
    star.style.animation = `fall ${duration}s linear ${delay}s infinite`;
 });
 