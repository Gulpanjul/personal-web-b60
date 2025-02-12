const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const path = require("path");

const { formatDateToWIB, getRelativeTime } = require("./utils/time");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));
// console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("stage-1/assets"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
	return a === b;
});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

let blogs = [];

// HOME
app.get("/", (req, res) => {
	res.render("index");
});

// CONTACT ME
app.get("/contact", (req, res) => {
	res.render("contact");
});

// BLOG
app.get("/blog", (req, res) => {
	console.log(blogs);
	res.render("blog-list", { blogs: blogs });
});

// CREATE BLOG PAGE
app.get("/blog-create", (req, res) => {
	res.render("blog-create");
});

// SUBMIT NEW BLOG
app.post("/blog-create", (req, res) => {
	const { title, content } = req.body;
	console.log(title);

	let imageFileName = "";

	let newBlog = {
		title: title,
		content: content,
		image: imageFileName,
		author: "Andhika Chandra Gulpa",
		postedAt: new Date(),
	};

	blogs.push(newBlog);

	res.redirect("/blog");
});

// BLOG DETAIL
app.get("/blog/detail", (req, res) => {
	res.render("blog-detail");
});

// TESTIMONIALS
app.get("/testimonials", (req, res) => {
	res.render("testimonials");
});

app.listen(port, () => {
	console.log(`My personal web app listening on port ${port}`);
});
