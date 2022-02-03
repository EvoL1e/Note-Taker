const express = require('express');
const htmlRoutes = require('./routes/html');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', notesRouter);
app.use('/', htmlRoutes);


app.listen(PORT, () =>
    console.log(`See application at http://localhost:${PORT}`)
);