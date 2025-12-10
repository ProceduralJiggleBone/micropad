import express from 'express';
import { engine } from 'express-handlebars';
import { create } from 'express-handlebars';
import fs from 'node:fs';

let content = ""
let innerHtml = ""
const app = express();
const hbs = create({ /* config */ });

//let size = [5, 3];
let rawdata = fs.readFileSync('layout.json');
let layout = JSON.parse(rawdata);
console.log(layout);
let columns = [];
let rows = [];
let items = [];
let numOfColumns = layout.shape[0];
let numOfRows = layout.shape[1];
let boxname = 0;

for (let i = 0; i < layout.shape[0]; i++) {
    columns[i] = i + 1;
}

for (let i = 0; i < layout.shape[1]; i++) {
    rows[i] = i + 1;
}
for (let i = 0; i < layout.items.length; i++) {

    if (layout.items[i].externalHTML) {
        fs.readFile(layout.items[i].HTML, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
            items.push(data);
        });
    } else {
        items.push(layout.items[i].HTML);
    }

};
console.log(items);
console.log(columns);
console.log(rows);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {items: items, numOfColumns: numOfColumns, columns: columns, rows: rows, numOfRows: numOfRows});
});

app.listen(3000, '0.0.0.0');