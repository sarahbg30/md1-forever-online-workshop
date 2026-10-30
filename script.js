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

// white light transition when clicking a .flash-link
const flash = document.querySelector('.white-flash');

document.querySelectorAll('.flash-link').forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();          // don't change page right away
		flash.classList.add('on');       // start the white fade
		setTimeout(() => {
			window.location.href = link.href;   // change page once the screen is white
		}, 100);                         // same duration as toWhite (0.8s)
	});
});

// if you come back with the "back" button, remove the white screen
window.addEventListener('pageshow', () => {
	if (flash) flash.classList.remove('on');
});

// talking characters: each click shows the next line
const defaultLines = [
	'dont play the innocent',
	'YOU called us',
	'...',
	'than...',
	'start the sacrifice'
];

document.querySelectorAll('.talker').forEach((talker) => {
	const bubble = talker.querySelector('.bubble');
	const lines = talker.dataset.lines ? talker.dataset.lines.split('|') : defaultLines;
	let lineNumber = 0;

	talker.addEventListener('click', () => {
		if (lineNumber < lines.length) {
			bubble.textContent = lines[lineNumber];   // put the text in the bubble
			bubble.classList.add('show');             // show the bubble

			// last line said: unlock the images that were waiting for the dialogue
			if (lineNumber === lines.length - 1) {
				document.querySelectorAll('.locked').forEach((thing) => {
					thing.classList.remove('locked');
				});
			}

			if (lines[lineNumber] === 'start the sacrifice') {

				// 0s: each character with data-melt melts into its new image
				document.querySelectorAll('[data-melt]').forEach((oldEl) => {
					const newImg = document.createElement('img');
					newImg.src = oldEl.dataset.melt;
					newImg.alt = '';
					newImg.className = 'stage-item melt-in';
					newImg.style.cssText = oldEl.style.cssText;
					if (oldEl.dataset.meltWidth) newImg.style.width = oldEl.dataset.meltWidth;
					oldEl.after(newImg);
					oldEl.classList.add('melt-out');
				});

				// 0.5s: the candle vanishes
				setTimeout(() => {
					document.querySelectorAll('.vanish-thing').forEach((thing) => {
						thing.classList.add('gone');
					});
				}, 500);

				// 3s: the sacrifice images appear
				setTimeout(() => {
					document.querySelectorAll('.sacrifice-thing').forEach((thing) => {
						thing.classList.add('appear');
					});

					// 5s later: flash, then change page
					setTimeout(() => {
						flash.classList.add('on');
						setTimeout(() => {
							window.location.href = './ground.html';   // ← the page to go to
						}, 1000);
					}, 5000);

								}, 3000);
			}

			lineNumber = lineNumber + 1;
		} else {
			bubble.classList.remove('show');          // after the last line, hide it
			lineNumber = 0;                           // start over next time
		}
	});
});

// click an image with .melt-click: it melts into another image, then changes page
// click an image with .melt-click: it melts into another image, then changes page
document.querySelectorAll('.melt-click').forEach((oldImg) => {
	oldImg.addEventListener('click', () => {
		if (oldImg.classList.contains('locked')) return;   // not yet: talk to the talker first
		oldImg.classList.add('locked');                     // only one click
		const newImg = document.createElement('img');
		newImg.src = oldImg.dataset.meltInto;
		newImg.alt = '';
		newImg.className = 'melt-in';
		newImg.style.cssText = oldImg.style.cssText;   // same place and size as the old one
		if (oldImg.dataset.meltWidth) newImg.style.width = oldImg.dataset.meltWidth;   // new size, if given
		if (oldImg.dataset.meltTop) newImg.style.top = oldImg.dataset.meltTop;         // new position, if given
		if (oldImg.dataset.meltLeft) newImg.style.left = oldImg.dataset.meltLeft;
		oldImg.after(newImg);
		oldImg.classList.add('melt-out');

		// data-melt-link: the new image opens a page when clicked
		if (oldImg.dataset.meltLink) {
			newImg.style.cursor = 'pointer';
			newImg.addEventListener('click', () => {
				if (flash) flash.classList.add('on');
				setTimeout(() => {
					window.location.href = oldImg.dataset.meltLink;
				}, 1000);
			});
		}

		// data-go: 3s melt + 3s to look at the new image, then flash and go
		setTimeout(() => {
			if (!oldImg.dataset.go) return;   // no data-go: just melt, stay on the page
			if (flash) flash.classList.add('on');
			setTimeout(() => {
				window.location.href = oldImg.dataset.go;
			}, 1000);
		}, 6000);
	});
});



// background music: each page has its own <audio id="bg-music">
const music = document.querySelector('#bg-music');

if (music) {
	music.volume = 0.5;   // 0 = silent, 1 = max

	// browsers block sound until the user interacts with the page,
	// so we try right away, and if it's blocked we start on the first click
	music.play().catch(() => {
		window.addEventListener('click', () => music.play(), { once: true });
	});
}

// click the bird: the shot and "well done" appear
const bird = document.querySelector('#bird');

if (bird) {
	bird.addEventListener('click', () => {
		bird.style.top = '200%';   // the bird falls off the screen
		document.querySelectorAll('.hidden-thing').forEach((thing) => {
			thing.classList.add('appear');
		});

		// 3.5s to read "well done", then go to ground
		setTimeout(() => {
			window.location.href = './ground.html';
		}, 3500);
	});
}