let selectedPlanPrice = null;
let selectedPaymentMethod = null;

// Event listeners for the "Subscribe Now" buttons
const subscribeBtns = document.querySelectorAll(".subscribe-btn");
subscribeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        selectedPlanPrice = parseFloat(e.target.dataset.price);
        alert(`You have selected a plan for $${selectedPlanPrice}. Please choose your payment method.`);
        document.getElementById('payment-section').style.display = 'block'; // Hide payment section initially
    });
});

// Event listeners for payment method images
const paymentMethods = document.querySelectorAll('.payment-method');
paymentMethods.forEach((method) => {
    method.addEventListener('click', () => {
        if (!selectedPlanPrice) {
            alert('Please select a plan first.');
            return;
        }

        // Get the payment method ID to determine which method was selected
        selectedPaymentMethod = method.id;
        alert(`You have chosen ${selectedPaymentMethod} as your payment method.`);
        
        // Show the payment section to input amount
        document.getElementById('payment-section').style.display = 'block';
    });
});

// Confirm payment button event listener
document.getElementById('confirm-payment').addEventListener('click', () => {
    const paidAmount = parseFloat(document.getElementById('paid-amount').value);

    if (isNaN(paidAmount)) {
        alert('Please enter a valid amount.');
        return;
    }

    processPayment(selectedPaymentMethod, paidAmount);
});

// Function to process the payment
function processPayment(method, paidAmount) {
    if (paidAmount >= selectedPlanPrice) {
        alert(`🎉✨ Congratulations! You have successfully subscribed using ${method}! ✨🎉`);
    } else {
        alert(`Not enough funds to subscribe via ${method}. Please recharge and try again.`);
    }
}



// Function to validate credentials based on the selected payment method
function validateCredentials() {
    if (selectedPaymentMethod === 'paypal') {
        const paypalEmail = document.getElementById('paypal-email').value;
        if (!paypalEmail) {
            alert('Please enter your PayPal email.');
            return false;
        }
    } else if (selectedPaymentMethod === 'card') {  
        const cardNumber = document.getElementById('card-number').value;
        if (!cardNumber) {
            alert('Please enter your card number.');
            return false;
        }
    } else if (selectedPaymentMethod === 'mpesa') {
        const mpesaNumber = document.getElementById('mpesa-number').value;
        if (!mpesaNumber) {
            alert('Please enter your M-Pesa number.');
    } else if (selectedPaymentMethod === 'mtnmomo') {
        const momoNumber = document.getElementById('momo-number').value;
        if (!momoNumber) {
            alert('Please enter your MTN MoMo number.');
            return false;
        }
    } else if (selectedPaymentMethod === 'bankcard') {
        const cardNumber = document.getElementById('bank-card-number').value;
        const cardPassword = document.getElementById('bank-password').value;
        if (!cardNumber || !cardPassword) {
            alert('Please enter your bank card number and password.');
            return false;
        }
    }
    return true;
}
}

// // Function to process the payment
// function processPayment(method, paidAmount) {
//     if (paidAmount >= selectedPlanPrice) {
//         alert(`🎉✨ Congratulations! You have successfully subscribed using ${method}! ✨🎉`);
//     } else {
//         alert(`Not enough funds to subscribe via ${method}. Please recharge and try again.`);
//     }
// }
// processPayment()