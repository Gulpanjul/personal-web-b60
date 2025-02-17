const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const { query } = require("express");

const sequelize = new Sequelize(config.development);
let blogs = [
	{
		title: "Pasar Coding di Indonesia",
		content:
			"WEBSITE.CO.ID, LOKASI –– Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur perferendis alias excepturi dolorem laudantium eius consequuntur repellendus fugit, dolorum asperiores provident possimus id cumque non iusto praesentium labore amet itaque. Expedita assumenda accusantium iure ipsa vero debitis aliquid a fugit! Ea deserunt id architecto quas sunt et delectus, aut earum!",
		image: "img/blog.jpg",
		author: "Gulpa",
		postedAt: new Date(
			"Fri July 21 2024 10:15:00 GMT+0700 (Western Indonesia Time)"
		),
	},
	{
		title: "Sistem Operasi di Indonesia",
		content:
			"WEBSITE.CO.ID, LOKASI –– Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur perferendis alias excepturi dolorem laudantium eius consequuntur repellendus fugit, dolorum asperiores provident possimus id cumque non iusto praesentium labore amet itaque. Expedita assumenda accusantium iure ipsa vero debitis aliquid a fugit! Ea deserunt id architecto quas sunt et delectus, aut earum!",
		image: "img/blog.jpg",
		author: "Gulpa",
		postedAt: new Date(
			"Fri July 28 2024 20:15:00 GMT+0700 (Western Indonesia Time)"
		),
	},
];

async function renderBlog(req, res) {
	const blogs = await sequelize.query(
		`SELECT * FROM "Blogs" ORDER BY "createdAt" DESC`,
		{
			type: QueryTypes.SELECT,
		}
	);
	// console.log(blogs);
	res.render("blog-list", {
		blogs: blogs,
	});
}

async function renderBlogDetail(req, res) {
	const id = req.params.id;

	const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
	const blogYangDiPilih = await sequelize.query(query, {
		type: QueryTypes.SELECT,
	});
	console.log("hasil query : ", blogYangDiPilih[0]);

	res.render("blog-detail", { blog: blogYangDiPilih[0] });
}

async function createBlog(req, res) {
	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judulnya adalah", title);
	console.log("contentnya :", content);

	let imageFileName = "";

	let query = `INSERT INTO public."Blogs" ("title", "content", "image") VALUES ('${title}', '${content}', '${imageFileName}') `;

	const newBlog = await sequelize.query(query, {
		type: QueryTypes.INSERT,
	});

	// blogs.push(newBlog);

	res.redirect("/blog");
}

async function renderBlogEdit(req, res) {
	const id = req.params.id;

	const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
	const blogYangDiPilih = await sequelize.query(query, {
		type: QueryTypes.SELECT,
	});
	console.log("hasil query : ", blogYangDiPilih[0]);

	res.render("blog-edit", { blog: blogYangDiPilih[0] });
}

async function updateBlog(req, res) {
	const id = req.params.id;
	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judul baru :", title);
	console.log("content baru :", content);

	const query = `UPDATE "Blogs" SET title = '${title}', content = '${content}' WHERE id = ${id}`;

	const updateResult = await sequelize.query(query, {
		type: QueryTypes.UPDATE,
	});

	console.log("update result : ", updateResult);

	// let imageFileName = "";

	// let updateBlog = {
	// 	title: title,
	// 	content: content,
	// 	image: imageFileName,
	// 	author: "Andhika Chandra Gulpa",
	// 	postedAt: new Date(),
	// };

	// blogs[id] = updateBlog;

	res.redirect("/blog");
}

function deleteBlog(req, res) {
	const id = req.params.id;
	const blogYangDiPilih = blogs[id];
	console.log(blogYangDiPilih);

	blogs.splice(id, 1); // array manipulation => perubahan data pada array

	res.redirect("/blog");
}

module.exports = {
	renderBlog,
	renderBlogDetail,
	renderBlogEdit,
	createBlog,
	updateBlog,
	deleteBlog,
};
