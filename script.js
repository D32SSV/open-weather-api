// Find the button by its id
const goToSecondPageButton = document.getElementById('btn');

// Add a click event listener to the button
goToSecondPageButton.addEventListener('click', () => {
    // Change the location to the second page
    window.location.href = 'weather.html';
});

// Check if geolocation is available in the browser
