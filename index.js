const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const path = require('path');
const port = 3000;

// Set up handlebars as the view engine
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render the 'home' template
app.get('/', (req, res) => {
    return res.render('home');
});

// Handle socket.io connections
io.on('connection', function(socket) {
    // Listen for 'chat message' event
    socket.on('chat message', function(msg) {
        // Emit the 'chat message' event to all connected clients
        io.emit('chat message', msg);
    });
});

// Start the server and listen on port 3000
http.listen(port, function() {
    console.log(`Listening on: http://localhost:${port}`);
});