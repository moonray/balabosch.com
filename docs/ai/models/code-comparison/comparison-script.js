// Initialize after document is ready
$(document).ready(function() {
  setupTabs();
  setupDataTables();
  populatePricingTable();
});

// Setup category tabs
function setupTabs() {
  const tabList = $('#categoryTabs');
  const tabContent = $('.tab-content');
  
  // Create tabs and content
  Object.keys(categoryLabels).forEach((category, index) => {
    // Create tab
    const isActive = index === 0 ? 'active' : '';
    const tabItem = `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${isActive}" id="${category}-tab" data-bs-toggle="tab" 
                data-bs-target="#${category}" type="button" role="tab" 
                aria-controls="${category}" aria-selected="${index === 0}">
          ${categoryLabels[category]}
        </button>
      </li>
    `;
    tabList.append(tabItem);
    
    // Create content
    const tabPane = `
      <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="${category}" role="tabpanel" 
           aria-labelledby="${category}-tab">
        <div class="info-box mb-4">
          <strong>What is ${categoryLabels[category]}?</strong> ${categoryExplanations[category]}
        </div>
        <div class="card mb-4">
          <div class="card-header">
            <h3 class="h5 mb-0">${categoryLabels[category]} Rankings</h3>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-striped table-hover mb-0 category-table" id="${category}-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Model</th>
                    <th class="text-end">Score (%)</th>
                    <th class="text-end">Price ($/M tokens)</th>
                    <th class="text-center">Credits</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${populateCategoryTable(category)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    tabContent.append(tabPane);
  });
}

// Setup DataTables for all category tables
function setupDataTables() {
  $('.category-table').each(function() {
    $(this).DataTable({
      paging: false,
      searching: false,
      info: false,
      order: [[2, 'desc']], // Sort by score column (descending)
      columnDefs: [
        { orderable: false, targets: 5 }, // Notes column not sortable
        { type: 'num', targets: [0, 2, 3] }, // Numeric columns
        { 
          // Custom renderer for credits column
          targets: 4,
          render: function(data, type, row) {
            if (type === 'sort' || type === 'type') {
              // For sorting, convert null to high value
              return data === null ? 999 : data;
            }
            // For display
            return data === null ? '-' : data === 0 ? '0' : data + 'x';
          }
        }
      ]
    });
  });
  
  // Setup pricing table
  $('#pricing-table').DataTable({
    paging: false,
    searching: false,
    info: false,
    order: [[3, 'asc']], // Sort by blended price (ascending)
    columnDefs: [
      { orderable: false, targets: 5 }, // Notes column not sortable
      { type: 'num', targets: [1, 2, 3] }, // Numeric columns
      { 
        // Custom renderer for credits column
        targets: 4,
        render: function(data, type, row) {
          if (type === 'sort' || type === 'type') {
            // For sorting, convert null to high value
            return data === null ? 999 : data;
          }
          // For display
          return data === null ? '-' : data === 0 ? '0' : data + 'x';
        }
      }
    ]
  });
}

// Generate table rows for a specific category
function populateCategoryTable(category) {
  // Sort data by score (descending)
  const sortedData = [...categoryData[category]].sort((a, b) => b.score - a.score);
  
  // Build HTML for table rows
  let html = '';
  sortedData.forEach((item, index) => {
    const isHighest = index === 0 ? 'class="table-success"' : '';
    html += `
      <tr ${isHighest}>
        <td>${index + 1}</td>
        <td>${item.model}</td>
        <td class="text-end">${item.score.toFixed(1)}</td>
        <td class="text-end">$${item.price.toFixed(2)}</td>
        <td class="text-center">${item.credits === null ? '-' : item.credits === 0 ? '0' : item.credits + 'x'}</td>
        <td>${item.notes}</td>
      </tr>
    `;
  });
  
  return html;
}

// Populate the pricing table
function populatePricingTable() {
  const tableBody = $('#pricing-table tbody');
  
  // Convert pricing data to array and sort by blended price
  const pricingEntries = Object.entries(pricingData).sort((a, b) => a[1].blended - b[1].blended);
  
  // Build HTML for pricing table
  pricingEntries.forEach(([model, pricing]) => {
    const row = `
      <tr>
        <td>${model}</td>
        <td class="text-end">$${pricing.input.toFixed(2)}</td>
        <td class="text-end">$${pricing.output.toFixed(2)}</td>
        <td class="text-end">$${pricing.blended.toFixed(2)}</td>
        <td class="text-center">${pricing.credits === null ? '-' : pricing.credits === 0 ? '0' : pricing.credits + 'x'}</td>
        <td>
          ${pricing.credits === 0 ? 'Free (0 credits)' :
            pricing.blended < 0.10 ? 'Extremely cost-effective' : 
            pricing.blended < 0.50 ? 'Very good value' : 
            pricing.blended < 1.00 ? 'Moderate pricing' : 
            'Premium pricing'}
        </td>
      </tr>
    `;
    tableBody.append(row);
  });
}