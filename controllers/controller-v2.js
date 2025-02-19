const { Sequelize, where } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Blog, User } = require("../models");

const sequelize = new Sequelize(config.development);

const saltRounds = 10;

async function renderHome(req, res) {
	const user = req.session.user;
	console.log("usernya adalah :", user);
	res.render("index", { user: user });
}

async function authLogin(req, res) {
	const { email, password } = req.body;
	// console.log(`yang mau login : ${email} ${password}`);

	// check kalau usernya ada atau tidak
	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		req.flash("error", "User tidak ditemukan.");
		return res.redirect("/login");
	}

	// console.log("user ada!", user);

	// check kalau password salah
	const isValidated = await bcrypt.compare(password, user.password); // return sebuah bolean, apakah true or false

	if(!isValidated) {
		req.flash("error", "Password mismatch.");
		return res.redirect("/login");
	}

	let loggedInUser = user.toJSON(); // convert dari object sequelize ke object biasa

	delete loggedInUser.password; // menghapus properti password pada object new user

	console.log("user setelah password di delete :", loggedInUser);
	req.session.user = loggedInUser;

	req.flash("success", `Selamat datang ${loggedInUser.name}`);
	res.redirect("/");
}

async function authRegister(req, res) {
	const { name, email, password, confirmPassword } = req.body; // object destructuring

	if (password !== confirmPassword) {
		req.flash("error", "Password dan confirm password tidak sesuai.");
		return res.redirect("/register");
	}

	// check apakah email sudah terpakai
	const user = await User.findOne({ where: { email: email } });

	if (user) {
		req.flash("error", "Email sudah terpakai.");
		return res.redirect("/register");
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = {
		name,
		email,
		password: hashedPassword,
	};

	console.log("user baru :", newUser);

	const userInsert = await User.create(newUser);

	req.flash("success", "Berhasil mendaftar, silahkan login.");
	res.redirect("/login");
}

async function authLogout(req, res) {
	// hapus user dari session
	req.session.user = null;
	
	res.redirect("/login");
}

async function renderBlog(req, res) {
	const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });

	console.log("hasil fetch data dari controller v2", blogs);

	res.render("blog-list", {
		blogs: blogs,
	});
}

async function renderBlogDetail(req, res) {
	const id = req.params.id;

	// type data nya adalah object bukan array
	const blogYangDiPilih = await Blog.findOne({ where: { id: id } });

	if (blogYangDiPilih === null) {
		res.render("page-404");
	} else {
		console.log("v2 blog detail :", blogYangDiPilih);
	}

	console.log("v2 blog detail", blogYangDiPilih);

	res.render("blog-detail", { blog: blogYangDiPilih });
}

async function renderBlogCreate(req, res) {
	// render halaman create blog
	res.render("blog-create");
}

async function createBlog(req, res) {
	// create blog submission
	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judulnya adalah", title);
	console.log("contentnya :", content);

	let imageFileName = "";

	const newBlog = {
		title, // ini sama saja dengan menuliskan title: title
		content,
		image: imageFileName,
	};

	const resultSubmit = await Blog.create(newBlog); // apa result nya ketika disubmit, gagal atau berhasil?
	console.log("result creating blog ", resultSubmit);

	res.redirect("/blog"); // URL bukan nama file
}

async function deleteBlog(req, res) {
	const { id } = req.params;
	const deleteResult = await Blog.destroy({
		where: {
			id: id,
		},
	});

	console.log("delete result : ", deleteResult);

	res.redirect("/blog");
}

async function renderBlogEdit(req, res) {
	// render halaman edit blog
	const id = req.params.id;

	const blogYangDiPilih = await Blog.findOne({ where: { id: id } });

	if (blogYangDiPilih === null) {
		res.render("page-404");
	} else {
		console.log("v2 blog detail :", blogYangDiPilih);

		res.render("blog-edit", { blog: blogYangDiPilih }); // tidak perlu index
	}
}

async function updateBlog(req, res) {
	// apa yang dilakukan ketika
	// update blog submission
	const id = req.params.id;

	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judul baru :", title);
	console.log("content baru :", content);

	const updateResult = await Blog.update(
		{
			// form edit
			title,
			content,
			updatedAt: sequelize.fn("NOW"),
		},
		{
			// where clause atau filter yang mana yg mau di edit
			where: {
				id,
			},
		}
	);

	console.log("update result", updateResult);

	res.redirect("/blog");
}

module.exports = {
	renderHome,
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
};
