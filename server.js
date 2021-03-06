const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/rusc-www-angular-asc-tuto'));

app.get('/*', (req, res) => {
    res.sendFile('main.ts', { root: 'dist/rusc-www-angular-asc-tuto'});
});

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Server up ! Listening on port ${port} ...`));
