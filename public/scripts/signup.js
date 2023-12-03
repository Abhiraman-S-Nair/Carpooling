// signup.js

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);

    // Convert formData to JSON object
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send data to the server for user registration
    // Replace 'http://your-backend-url/register' with the actual URL
    fetch('http://localhost:3000/signup', {
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
            // Display success message
            alert(`Signup successful!\n\nWelcome, ${data.name}!`);

            // Redirect to the login page
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        });
});
