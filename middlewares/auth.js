async function checkUser(req, res, next) {
	const user = req.session.user;

	if (!user) {
        req.flash("error", "Please login");
		res.redirect("/login");
	}

    console.log("ada yang login nih", user);

	next();
}

module.exports = checkUser;
