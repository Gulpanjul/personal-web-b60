const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "stage-1/views");

app.use(express.static("stage-1"));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

app.get("/blog", (req, res) => {
	res.render("blog");
});

app.get("/blog/detail", (req, res) => {
	res.render("blog-detail");
});

app.get("/testimonials", (req, res) => {
	res.render("testimonials");
});

app.listen(port, () => {
	console.log(`My personal web app listening on port ${port}`);
});
