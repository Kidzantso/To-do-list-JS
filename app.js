const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskrouter');
const focusRoutes = require('./routes/focusrouter');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', taskRoutes);
app.use('/focus', focusRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
