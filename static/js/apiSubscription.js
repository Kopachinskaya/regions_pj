    
            // Optionally, if you want to handle form submission via JS (AJAX)
            document.getElementById('saveDataButton').addEventListener('submit', async function(e) {
                e.preventDefault(); // Prevent default form submission
    
                const formData = new FormData(this);
                let dictionary = new Object();
                const endpoint = "http://127.0.0.1:5000/dashboard_api";
    
                // Populate the data object with the form values
                for (let [key, value] of formData.entries()) {
                    dictionary[key] = value;
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dictionary)
                });
            
                const result = await response.json();
                console.log(result)
                window.location.reload()
            });
