import express from 'express';
import { engine } from 'express-handlebars';
import { create } from 'express-handlebars';
import fs from 'node:fs';

let content = ""
let innerHtml = ""
const app = express();
const hbs = create({ /* config */ });

let size = [5, 3];
let columns = [];
let rows = [];
let items = [];
let sizewidth = size[0];
let sizeheight = size[1];
let boxname = 0;

/*for (let x = 0; x < size[0]; x++) {
    //console.log("x=" + x);

    for (let y = 0; y < size[1]; y++) {
        items.push(String(x + 1) + "x" + String(y + 1));
    }
    columns.push(x + 1);
}*/
for  (let y = 0; y < size[1]; y++) {

    for (let x = 0; x < size[0]; x++){
        boxname = String(x + 1) + "x" + String(y + 1)
        items.push(boxname);
            fs.readFile('2x3.html', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            });
        columns[x] = x + 1;
    }
    rows[y] = y + 1;
}
//items[4] = ''
console.log(items);
console.log(columns);
console.log(rows);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    /*innerHtml = hbs.renderView("views/external.handlebars", {layout: false});*/
    /*console.log(innerHtml);*/
    res.render('home', {items: items, sizewidth: sizewidth, columns: columns, rows: rows, sizeheight: sizeheight});
});

app.listen(3000, '0.0.0.0');