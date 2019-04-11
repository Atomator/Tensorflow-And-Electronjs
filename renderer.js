// This files handles the rendering off the information from the api.py

// Imports Zerorpc then creates a client
const zerorpc = require("zerorpc")
let client = new zerorpc.Client()

// Connects to the server
client.connect("tcp://127.0.0.1:4242")

// Gets function from the class passed through the server
// It thens passes a call ("server ready") to the echo function, and waits for a identical response back
client.invoke("echo", "server ready", (error, res) => {
  // If it doesn't get the call or if it gets an error, print that to the console
  if(error || res !== 'server ready') {
    console.error(error)
  // If the servers echos the call, print that the server is ready
  } else {
    console.log("server is ready")
  }
})

// Defines the document portions within the HTML code
let size = document.querySelector('#size')
let tensor = document.querySelector('#tensor')

// Adds an event listener the input with the "size" id on the HTML code
size.addEventListener('input', () => {

  // It stores the size value in a variable that turns it into a number

  // Checks if the value is to large in order to prevent the app from crashing; handled on the javascript side
  if (Number(size.value) > 100) {
    tensorSize = 0
  // Checks if the values passed is not a number
  } else if (isNaN(Number(size.value))){
    tensorSize = 0
  // Passess the value on through if it is successful
  } else {
    tensorSize = Number(size.value)
  }

  // Invokes the zerorpc server in order to pass data into the tensor function
  client.invoke("createTensor", tensorSize, (error, res) => {
    // Checks to see if there is an error
    if (error){
      console.error(error)
      // Sets the text of the <p> with the id tensor to be equal to Error
      tensor.textContent = "Error; try again"
    } else {
      // Sets the text of the <p> with the id tensor to be equal to the tensor in string form that is passed from the api.py
      tensor.textContent = res
      console.log(res)
    }
  })
})

// Starts the eventhandler on the input
size.dispatchEvent(new Event('input'))
