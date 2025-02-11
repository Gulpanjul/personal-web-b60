const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "stage-1/views");

app.use(express.static("stage-1"));

// HALAMAN HOME
app.get("/", (req, res) => {
	res.send("Hello express! Ini halaman utama");
	res.render("index");
});

// REQUEST PARAMS
app.get("/about:id", (req, res) => {
	const id = req.params.id;
    res.send(`Halo! ini halaman tentang ${id}`);
});

// REQUEST QUERY
app.get("/blog", (req, res) => {
	const { title, author, year } = req.query;
	res.send(`Ini halaman blog ${title} oleh ${author} tahun ${year}`);
});

app.listen(port, () => {
	console.log(`My personal web app listening on port ${port}`);
});
