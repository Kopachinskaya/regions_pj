            // Optionally, if you want to handle form submission via JS (AJAX)
            document.getElementById('table-data-info').addEventListener('submit', async function(e) {
                e.preventDefault(); // Prevent default form submission
    
                const formData = new FormData(this);
                const data = {};
    
                // Populate the data object with the form values
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }

                const response = await fetch('/dashboard.json', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            
                const result = await response.json();
                console.log(result)

            });
