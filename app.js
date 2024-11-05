const filterInputs = document.querySelectorAll('.filter-row input');

// Function to filter table rows
function filterTable() {
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tbody tr");

    // Loop through each row and apply the filters
    rows.forEach(row => {
        let showRow = true;

        // Loop through each filter input field
        filterInputs.forEach((input, index) => {
            const filterText = input.value.toLowerCase().trim();
            const cell = row.cells[index];
            
            if (filterText !== '' && cell && !cell.textContent.toLowerCase().includes(filterText)) {
                showRow = false;
            }
        });

        // Show or hide the row based on whether it matches the filters
        row.style.display = showRow ? '' : 'none';
    });
}

// Add event listener to each filter input field
filterInputs.forEach(input => {
    input.addEventListener('input', filterTable);
});

function highlightSelectedOption(selectElement) {
Array.from(selectElement.options).forEach(option => {
    option.classList.remove("selected-option"); // Remove existing highlight
});

if (selectElement.value) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    selectedOption.classList.add("selected-option"); // Highlight selected option
}
}

// Search function
function handleSearch() {
const query = document.getElementById("searchInput").value.toLowerCase();
const filteredData = data.filter(item =>
    Object.values(item).some(value => value.toLowerCase().includes(query))
);

displayData(filteredData);
}

// Populate dropdowns
Object.keys(dropdownData).forEach(id => {
const select = document.getElementById(id);
dropdownData[id].forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
});
});
function clearHighlights() {
const selects = document.querySelectorAll("select");
selects.forEach(select => {
    Array.from(select.options).forEach(option => {
        option.classList.remove("selected-option");
    });
});
}

// Export data (placeholder)
function exportData() {
alert("Exporting data functionality.");
}

// Initialize display with all data
displayData(data);
function compareSelected() {
alert("Compare selected items functionality.");
}
function clearHighlights() {
const selects = document.querySelectorAll("select");
selects.forEach(select => {
    Array.from(select.options).forEach(option => {
        option.classList.remove("selected-option");
    });
});
}

// Export data (placeholder)
function exportData() {
alert("Exporting data functionality.");
}

// Initialize display with all data
displayData(data);
function clearFilters() {
document.getElementById("regionSelect").value = "";
document.getElementById("pricingUnitSelect").value = "";
document.getElementById("costFilter").value = "";
document.getElementById("discountFilter").value = "";
document.getElementById("searchInput").value = "";
displayData(data); // Reset to show all data
clearHighlights(); // Clear highlights
}
function displayData(filteredData) {
const dataDisplay = document.getElementById("dataDisplay");
dataDisplay.innerHTML = "";

if (filteredData.length === 0) {
    dataDisplay.innerHTML = "<p>No data available.</p>";
    return;
}
}



function handleSearch() {
const input = document.getElementById('searchInput').value.toLowerCase(); // Get input value and convert to lowercase
const rows = document.querySelectorAll('#dataTable tbody tr'); // Select all table rows

rows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Get the text content of the row
    if (rowText.includes(input)) { // Check if the row text includes the input
        row.classList.remove('hidden'); // Show the row if it matches
    } else {
        row.classList.add('hidden'); // Hide the row if it doesn't match
    }
});
}

// Add click event listeners to table rows
const rows = document.querySelectorAll('#dataTable tbody tr');
rows.forEach(row => {
row.addEventListener('click', () => {
    // Remove 'selected' class from all rows
    rows.forEach(r => r.classList.remove('selected'));
    // Add 'selected' class to the clicked row
    row.classList.add('selected');
});
});

// Add change event listener to dropdown
const dropdown = document.createElement('select');
dropdown.innerHTML = `
<option value="">Select an Option</option>
<option value="option1">Option 1</option>
<option value="option2">Option 2</option>
<option value="option3">Option 3</option>
`;
document.body.insertBefore(dropdown, document.getElementById('dataTable'));

dropdown.addEventListener('change', () => {
const selectedRow = document.querySelector('#dataTable tbody tr.selected');
if (selectedRow) {
    // You can use the selected value from the dropdown here
    console.log('Selected Row:', selectedRow.textContent);
    console.log('Selected Option:', dropdown.value);
    // You can add additional logic based on the selected option
} else {
    alert('Please select a row first!');
}
});
const API_URL = 'https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview';

// Fetch and display data
async function fetchPricingData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    populateTable(data.Items);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function populateTable(items) {
  const tableBody = document.getElementById('pricing-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing data

  items.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.productName || "N/A"}</td>
      <td>${item.meterName || "N/A"}</td>
      <td>${item.memory || "N/A"}</td>
      <td>${item.vcpu || "N/A"}</td>
      <td>${item.storage || "N/A"}</td>
      <td>${item.retailPrice ? `$${item.retailPrice.toFixed(2)}` : "N/A"}</td>
      <td>Unavailable</td>
      <td>Unavailable</td>
      <td>Unavailable</td>
      <td>${item.windowsRetailPrice ? `$${item.windowsRetailPrice.toFixed(2)}` : "N/A"}</td>
      <td>Unavailable</td>
      <td>Unavailable</td>
      <td>Unavailable</td>
    `;
    tableBody.appendChild(row);
  });
}

// Simple filter for the table (by Name and API Name)
function setupFilters() {
  const filterInputs = document.querySelectorAll('.filter-input');

  filterInputs.forEach(input => {
    input.addEventListener('input', () => {
      const filterValue = input.value.toLowerCase();
      const column = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
      const rows = document.querySelectorAll('#pricing-table tbody tr');

      rows.forEach(row => {
        const cell = row.children[column];
        if (cell && cell.textContent.toLowerCase().includes(filterValue)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// Refresh data every 30 minutes
setInterval(fetchPricingData, 30 * 60 * 1000);

// Initial fetch and setup filters
fetchPricingData();
setupFilters();
// script.js
async function fetchSuggestions(query) {
  try {
      // Example API endpoint, replace with your actual API
      const response = await fetch(`https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview${query}`);
      const data = await response.json();

      return data.suggestions; // Assuming the API returns suggestions in this format
  } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
  }
}

async function filterSearch() {
  const input = document.getElementById('searchBox').value.trim();
  const suggestionsContainer = document.getElementById('suggestions');
  suggestionsContainer.innerHTML = '';

  if (input) {
      const suggestions = await fetchSuggestions(input);

      suggestions.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          li.onclick = () => selectSuggestion(item);
          suggestionsContainer.appendChild(li);
      });
  }
}

function selectSuggestion(value) {
  document.getElementById('searchBox').value = value;
  document.getElementById('suggestions').innerHTML = '';
}

