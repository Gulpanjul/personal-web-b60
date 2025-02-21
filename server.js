const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./middlewares/upload-file");

// const { renderBlogEdit, updateBlog } = require("./controllers/controller-v1");

const {
	renderHome,
	renderLogin,
	renderRegister,
	renderContact,
	renderTestimonials,
	renderError,
	authLogin,
	authRegister,
	authLogout,
	renderBlog,
	renderBlogDetail,
	deleteBlog,
	renderBlogCreate,
	createBlog,
	renderBlogEdit,
	updateBlog,
} = require("./controllers/controller-v2");

const { formatDateToWIB, getRelativeTime } = require("./utils/time");
const checkUser = require("./middlewares/auth");

const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));
// console.log(__dirname);

// modul apa saja yang kita gunakan di dalam express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(methodOverride("_method"));
app.use(flash());

app.use(
	session({
		name: "my-session",
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
	return a === b;
});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);

// HOME
app.get("/", renderHome);

app.get("/login", renderLogin);

app.get("/register", renderRegister);

app.get("/logout", authLogout);

app.post("/register", authRegister);

app.post("/login", authLogin);

// CONTACT ME
app.get("/contact", renderContact);

// BLOG
app.get("/blog", renderBlog);

// RENDER CREATE BLOG
app.get("/blog-create", checkUser, renderBlogCreate);

// SUBMIT CREATE NEW BLOG
app.post("/blog-create", checkUser, upload.single("image"), createBlog);

// RENDER EDIT BLOG
app.get("/blog-edit/:id", renderBlogEdit);

// SUBMIT/SAVE EDITED BLOG
app.patch("/blog-update/:id", updateBlog);

// DELETE EXISTING BLOG
app.delete("/blog/:id", deleteBlog);

// BLOG DETAIL
app.get("/blog/:id", renderBlogDetail);

// TESTIMONIALS
app.get("/testimonials", renderTestimonials);

app.get("*", renderError);

app.listen(port, () => {
	console.log(`My personal web app listening on port ${port}`);
});
