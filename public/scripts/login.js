// login.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);

    // Convert formData to JSON object
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send data to the server for user login
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display alert on successful login
            alert('Login successful!');
            // Redirect to the profile page on successful login
            window.location.href = 'profile.html';
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed. Please check your credentials and try again.');
        });
});
