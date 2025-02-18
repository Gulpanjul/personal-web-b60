const { Sequelize, where } = require("sequelize");
const config = require("../config/config.json");
const { Blog } = require("../models");

const sequelize = new Sequelize(config.development);

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

async function updateBlog(req, res) { // apa yang dilakukan ketika 
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
            }
        }
    );

    console.log("update result", updateResult);

    res.redirect("/blog");
}


module.exports = {
	renderBlog,
	renderBlogDetail,
	deleteBlog,
	renderBlogCreate,
	createBlog,
	renderBlogEdit,
	updateBlog,
};
