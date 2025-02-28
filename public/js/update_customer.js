// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let inputPlanet = document.getElementById("input-planet-update")
    let inputAffiliation = document.getElementById("input-affiliation-update")


    // Get the values from the form fields
    let nameValue = inputName.value;
    let planetValue = inputPlanet.value;
    let affiliationValue = inputAffiliation.value;
    
    // Don't accept null values for planet

    if (planetValue === "") 
    {
        return;
    }

    if (affiliationValue === "")
    {
        affiliationValue = null;
    }
    

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: nameValue,
        planet: planetValue,
        affiliation: affiliationValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, nameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customer_id) {
    console.log(data);  // Log data to check the structure
    
    let table = document.getElementById("Customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == customer_id) {
           let updateRowIndex = table.getElementsByTagName("tr")[i];

           let tdPlanet = updateRowIndex.getElementsByTagName("td")[2];
           tdPlanet.innerHTML = data.planet || 'N/A';  // Add fallback if planet is undefined

           let tdAffiliation = updateRowIndex.getElementsByTagName("td")[3];
           tdAffiliation.innerHTML = data.affiliation || 'N/A';  // Add fallback if affiliation is undefined
       }
    }
}