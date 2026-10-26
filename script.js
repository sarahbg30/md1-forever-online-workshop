// this is a constant variable! constant variables never change after they are assigned a value
const myConstantVariable = 6;

// this is a 'let' variable, which 'lets' you change its value later on
let numberOfClicks = 0;

// this is an array, which is a special kind of variable that can hold lists of data
const colours = [ '#ff0000', '#ff00ff', '#00ff00', '#0000ff', ];
// READ MORE: https://www.w3schools.com/jsref/jsref_array[].asp


// this is a function! Functions are basically lists of instructions for the browser
// you can trigger functions on their own, or in response to user interactions.
// we are going to declare this function, then below it somewhere we'll 'call' it whenever the user clicks in the window

const handleClick = (event) => {
	numberOfClicks = numberOfClicks + 1;
	
	// printing information out to the console!
	console.log('The user has clicked ' + numberOfClicks + 'times');

	// using an if statement to ask if our variable numberOfClicks is greater than or equal to the length of our array
	// this means we don't stay within range
	if (numberOfClicks >= colours.length - 1) {
		numberOfClicks = 0;
	}

	// we can target specific elements on the page using document.querySelector(*tag, class or id*)
	// this one selects the first h1 tag it finds
	const h1 = document.querySelector('h1');

	// first let's check our element exists on the page
	if (h1) {
		// you can javascript to change the style of elements dynamically
		h1.style.color = colours[numberOfClicks];
	}
}

// here we are asking the function to run every time the user clicks inside the window
window.addEventListener('click', handleClick);

// this is how you call a function without waiting for an event to trigger it
const functionThatRunsOnItsOwn = (event) => {
	console.log('welcome!');
}

functionThatRunsOnItsOwn();