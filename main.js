// HTML DOM elements
const itemNameInput = document.getElementById('itemName');
const priceInput = document.getElementById('price');
const amountInput = document.getElementById('amount');
const discountInput = document.getElementById('discount'); // New input for discount
const itemList = document.getElementById('item-list');

// Initialize an object to store items by category
const itemsByCategory = {};
let totalAmount = 0; // Store total amount before discount

// Add an item with name, price, and amount
function addItem() {
    const itemName = itemNameInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const amount = parseInt(amountInput.value.trim());

    // Check if item name, price, and amount are valid
    if (itemName && !isNaN(price) && !isNaN(amount)) {
        if (!itemsByCategory[itemName]) {
            itemsByCategory[itemName] = [];
        }
        itemsByCategory[itemName].push({ price, amount });

        // Clear input fields
        itemNameInput.value = '';
        priceInput.value = '';
        amountInput.value = '1';

        // Refresh displayed items
        listItems();
    } else {
        alert("Please enter item name, price, and amount!");
    }
}

// Display all items by category
function listItems() {
    itemList.innerHTML = ''; // Clear the list
    totalAmount = 0; // Reset total amount

    for (const itemName in itemsByCategory) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('itemName');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = itemName;
        categoryDiv.appendChild(categoryTitle);

        itemsByCategory[itemName].forEach((item, index) => {
            const { price, amount } = item;
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('price');

            // Display item name, price, and amount
            const priceText = document.createElement('span');
            priceText.textContent = `${itemName}: $${price} x ${amount}`;

            // Add to total amount
            totalAmount += price * amount;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeItem(itemName, index);

            priceDiv.appendChild(priceText);
            priceDiv.appendChild(removeButton);
            categoryDiv.appendChild(priceDiv);
        });

        itemList.appendChild(categoryDiv);
    }

    // Display the total amount and apply any existing discount
    displayTotalAmount();
}

// Remove an item from the specified category
function removeItem(itemName, itemIndex) {
    itemsByCategory[itemName].splice(itemIndex, 1);

    if (itemsByCategory[itemName].length === 0) {
        delete itemsByCategory[itemName];
    }

    listItems(); // Refresh the list after removal
}

// Display the total amount and apply discount if any
function displayTotalAmount() {
    const discount = parseFloat(discountInput.value);
    const discountAmount = !isNaN(discount) ? (totalAmount * discount) / 100 : 0;
    const totalAfterDiscount = totalAmount - discountAmount;

    let totalDisplay = document.getElementById('total-amount');
    
    // If the total display doesn't exist, create it
    if (!totalDisplay) {
        totalDisplay = document.createElement('div');
        totalDisplay.id = 'total-amount';
        totalDisplay.style.textAlign = 'center';
        totalDisplay.style.fontWeight = 'bold';
        totalDisplay.style.marginTop = '20px';
        itemList.appendChild(totalDisplay); // Append to the item list
    }

    // Update total and discounted amounts
    totalDisplay.innerHTML = `
        <p>Total: $${totalAmount.toFixed(2)}</p>
        <p>After Discount: $${totalAfterDiscount.toFixed(2)}</p>
    `;
}
