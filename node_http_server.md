# A Tiny Ultra-minimalist HTTP Server Using Node

This tutorial will assume you know the very basics of working on a command line and how programming languages work.  This tutorial also assumes you have already installed Node.js.  This article will otherwise assume no prior knowledge.  The purpose of this tutorial is to help someone approaching web development as a novice.

This tutorial will use Node.js to build your own private HTTP server and how to start adding features beyond "Hello world."

## Schematic of the Exercise

You will use the command line to launch an HTTP server, using Node.js.

The two languages you will use today are JavaScript and HTML.  The initialism HTML stands for Hyper Text Markup Language.  You may recognize `.html` as a common website extension.
HTML is a markup language, which is different from a programming language.  Markup languages are not used to execute logic, and are instead used to present media.

JavaScript was developed as a scripting language for browsers.  Until 2009 browsers were the only available way to execute JavaScript, but now Node.js can be used to run it in your terminal.

You will begin by writing a JavaScript program which you will then run with Node.js.  Your script will use core modules provided by Node.js to launch your HTTP server.
You will then use your script to serve an HTML file.

## Create http_server.js

Create a file called `http_server.js` with this text:

```javascript
// Ultra-simple HTTP server

const http = require("http");

let server = http.createServer(
	(request, response) => {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('Hello world');
		response.end('Easy peasy.');
	}
);
const port = 8080;
server.listen(port);
console.log(`Listening! (port ${port})`);
```

In your terminal, navigate to the directory where you created the file above.  Use Node.js to execute the script, as shown below:

`$ node http_server.js`

Your terminal should print the words `Listening! (port 8080)` and nothing else.  If you see errors, make sure you read the errors to diagnose the problem. Once running, open your web browser of choice and navigate to http://localhost:8080 .  You should see your tiny web page!

Now let's walk through what you just did.

Node.js and your browser are communicating using HTTP, a network protocol.  This works just like any other website, except that the communication happens entirely within your own computer.

Lucky you, you do not have to know any details of the network protocol to create your server.  For HTTP there is already a function called `createServer` that's got you covered; all you need to know for this exercise is how to ask it nicely.

In order for the function to be available within your script you must first import the `http` core module, which you have done with your first line below the descriptive comment:

`const http = require("http");`

Then we see that `server` is instantiated like this:

`let server = http.createServer(
		...
);`

Before we dig into the parameters needed by `http.createServer`, let's keep going and see what the script does with `server` after it is instantiated.

```javascript
const port = 8080;
server.listen(port);
console.log(`Listening! (port ${port})`);
```

The line where you actually call the `server` you give it the instruction to `listen(port)` so it will be ready to receive requests at the port specified on the line above.  `8080` is one of several that tend to be used by HTTP, but this is your server and you may run it on whichever port you wish. (For technical reasons the available range should be 1024-65535 for most systems.)

As you may have noticed once you run your code it keeps your terminal occupied until you terminate the program with `ctrl-c`.  The final line of your program helpfully displays a message in your terminal for you, so you know your program is running and on which port.  Note the use of backticks `` ` `` around the string you wish to print; that enables you to use `${port}` to have your message adjust if you change ports.

Now let's come back and look at the arguments you gave `createServer` and break down what it's doing:

```javascript
let server = http.createServer(
	(request, response) => {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('Hello world');
		response.end('Easy peasy.');
			}
		);
```

Within `http.createServer` you are actually defining another function in `(request, response) => {...}` that will be executed upon receipt of an HTTP `request` and can create/modify a `response`.

You called `response.writeHead()` with arguments of the HTTP status code (`200` is the code for `OK`), and an Object containing the header `"Content-Type"` which tells the browser requesting your document that it should expect to see HTML.

Your next two calls use two different functions to send data upon a `request`.  `response.write()` can be called multiple times, in this example it is called once and renders the plain text `Hello world`.  `response.end()` tells the client requesting the content that no more content is coming after whatever (if anything) is sent along as its argument.  You could reproduce the same content by placing both in `response.write()` or both together in `response.end()`.  For this exercise it does not make a difference but this becomes important in other contexts. Streaming content, for instance, would need to come as `response.write()` arguments.

If you haven't already, go use your browser to check out your website.  So cute!  You can modify the strings in `response.write()` and `response.end()` to display different text.  Your changes will not be reflected automatically, to see them you'll need to save the changes and relaunch your server, then refresh your browser.  Ta-da!

## Serve an HTML File

Now let's try serving an actual file, and not just a hand-typed string.  If you start wandering into the documentation for Node.js for ideas on how to do this you'll see all sorts of talk about callback and promises and may get pretty lost.  Those are ways of handling asynchronicity, a very important thing that is beyond the scope of this exercise.  For now we're going to stick with synchronous construction, which is much simpler.

Create a file `index.html` and put whatever you want in it.  If you've never written any HTML and aren't sure what to do, just copy these two lines:
```HTML
<h1>Hello there.</h1>
  <p>General Kenobi</p>
```

Then edit your http_server.js file to:
```javascript
const fs = require('fs')
const http = require('http');

let server = http.createServer(
	(request, response) => {
		response.writeHead(200,  {'Content-Type': 'text/html'});
		response.end(fs.readFileSync('index.html'));
	}
);
const port = 8080;
server.listen(port);
console.log(`Listening! (port ${port})`);
```

The first line you add is to access another core module, in this case `fs` (for `FileSystem`).  To simplify you can delete the `response.write()` line entirely, and use your `response.end()` to deliver all of your content at once.

The key change here is instead of typing out a string for the server, you're telling it to respond by calling the synchronous `readFileSync()` function on your `index.html` file.  Now your `response` sends the HTML file on to the browser to render out into HTML.

Go ahead and try it!</p>

From here you can edit the content of `index.html<` and will be able to see those changes simply by saving the file and refreshing your browser.

Congrats, you have your own personal tiny HTTP server!
