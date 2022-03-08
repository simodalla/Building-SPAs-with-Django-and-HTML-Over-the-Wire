/*
    VARIABLES
*/
// Connect to WebSockets server (SocialNetworkConsumer)
const myWebSocket = new WebSocket(`${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${ document.body.dataset.host }/ws/social-network/`);
const inputAuthor = document.querySelector("#message-form__author");
const inputText = document.querySelector("#message-form__text");
const inputSubmit = document.querySelector("#message-form__submit");

/*
    FUNCTIONS
*/

/**
 * Send data to WebSockets server
 * @param {string} message
 * @param {WebSocket} webSocket
 * @return {void}
 */
function sendData(message, webSocket) {
    webSocket.send(JSON.stringify(message));
}


/**
 * Send new message
 * @param {Event} event
 * @return {void}
 */
function sendNewMessage(event) {
    event.preventDefault();
    // Prepare the information we will send
    const newData = {
        "action": "add message",
        "data": {
            "author": inputAuthor.value,
            "text": inputText.value
        }
    };
    // Send the data to the server
    sendData(newData, myWebSocket);
    // Clear message form
    inputText.value = "";
}

/**
 * Get current page stored in #paginator as dataset
 * @returns {number}
 */
function getCurrentPage() {
    return parseInt(document.querySelector("#paginator").dataset.page);
}

/**
 * Switch to the next page
 * @param {Event} event
 * @return {void}
 */
function goToNextPage(event) {
    // Prepare the information we will send
    const newData = {
        "action": "list messages",
        "data": {
            "page": getCurrentPage() + 1,
        }
    };
    // Send the data to the server
    sendData(newData, myWebSocket);
}

/**
 * Switch to the previous page
 * @param {Event} event
 * @return {void}
 */
function goToPreviousPage(event) {
    // Prepare the information we will send
    const newData = {
        "action": "list messages",
        "data": {
            "page": getCurrentPage() - 1,
        }
    };
    // Send the data to the server
    sendData(newData, myWebSocket);
}

/*
    EVENTS
*/

// Event when a new message is received by WebSockets
myWebSocket.addEventListener("message", (event) => {
    // Parse the data received
    const data = JSON.parse(event.data);
    // Renders the HTML received from the Consumer
    document.querySelector(data.selector).innerHTML = data.html;
    /* Reassigns the events of the newly rendered HTML */
    // Pagination
    document.querySelector("#messages__next-page")?.addEventListener("click", goToNextPage);
    document.querySelector("#messages__previous-page")?.addEventListener("click", goToPreviousPage);
});

// Sends new message when you click on Submit
inputSubmit.addEventListener("click", sendNewMessage);



/*
    INITIALIZATION
*/