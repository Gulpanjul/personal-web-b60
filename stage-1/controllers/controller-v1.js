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

function renderBlog(req, res) {
	// console.log(blogs);
	res.render("blog-list", {
		blogs: blogs,
	});
}

function renderBlogDetail(req, res) {
	const id = req.params;
	const blogYangDiPilih = blogs[id];
	// console.log(blogYangDiPilih);

	res.render("blog-detail", { blog: blogYangDiPilih });
}

function createBlog(req, res) {
	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judulnya adalah", title);
    console.log("contentnya :", content);

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
}

function renderBlogEdit(req, res) {
	const id = req.params.id;
	const blogYangDiPilih = blogs[id];
	console.log(blogYangDiPilih);

	res.render("blog-edit", { blog: blogYangDiPilih, index: id });
}

function updateBlog(req, res) {
    const id = req.params.id;
	const { title, content } = req.body; // tittle dan content adalah properti milik req.body
	console.log("judul baru :", title);
    console.log("content baru :", content);

    let imageFileName = "";

	let updateBlog = {
		title: title,
		content: content,
		image: imageFileName,
		author: "Andhika Chandra Gulpa",
		postedAt: new Date(),
	};

    blogs[id] = updateBlog;

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
