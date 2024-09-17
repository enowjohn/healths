const customAlertWrapper = document.querySelector('.custom__alert--wrapper');
const progressBar = document.querySelector('.progressBar');
const failedProgressBar = document.querySelector('.failedProgressBar');
const alertMessage = document.querySelector('.alert-message');
const failedAlerMessage = document.querySelector('.failedAler-Message');
const faild__alert = document.querySelector('.faild__alert');
const loading = document.querySelector('.loading');

// // Check if elements exist
// if (!customAlertWrapper) console.error("Element '.custom__alert--wrapper' not found.");
// if (!progressBar) console.error("Element '.progressBar' not found.");
// if (!failedProgressBar) console.error("Element '.failedProgressBar' not found.");
// if (!alertMessage) console.error("Element '.alert-message' not found.");
// if (!failedAlerMessage) console.error("Element '.failedAler-Message' not found.");
// if (!faild__alert) console.error("Element '.faild__alert' not found.");
// if (!loading) console.error("Element '.loading' not found.");

const duration = 2000;
const interval = 50;
let width = 100;
const decrement = (100 / (duration / interval));

// show the success alert
export function showSucessAlert(message) {
    if (customAlertWrapper && alertMessage && progressBar) {
        customAlertWrapper.style.display = 'block';
        alertMessage.innerHTML = message;
        const intervalId = setInterval(() => {
            width -= decrement;
            progressBar.style.width = width + '%';
            if (width <= 0) {
                clearInterval(intervalId);
                progressBar.style.width = '0%';
                setTimeout(() => {
                    customAlertWrapper.style.display = 'none';
                }, 2000);
            }
        }, interval);
    } else {
        console.error("Cannot show success alert: Required elements are missing.");
    }
}

export function failedsAlert(message) {
    if (faild__alert && failedAlerMessage && failedProgressBar) {
        faild__alert.style.display = 'block';
        failedAlerMessage.innerHTML = message;
        const intervalId = setInterval(() => {
            width -= decrement;
            failedProgressBar.style.width = width + '%';
            if (width <= 0) {
                clearInterval(intervalId);
                failedProgressBar.style.width = '0%';
                setTimeout(() => {
                    faild__alert.style.display = 'none';
                }, 1500);
            }
        }, interval);
    } else {
        console.error("Cannot show failed alert: Required elements are missing.");
    }
}

// show the loading on the screen
export function showLoading(type = 'loading') {
    if (loading) {
        loading.classList = type;
    } else {
        console.error("Cannot show loading: Element '.loading' not found.");
    }
}


// custom_alert.js

export function showErrorAlert(message) {
    // Implementation of error alert
    alert(`Error: ${message}`);
}

export function showSuccessAlert(message) {
    // Implementation of success alert
    alert(`Success: ${message}`);
}
