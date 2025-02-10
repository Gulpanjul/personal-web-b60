const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello express!");
});

app.get("/about", (req, res) => {
    res.send("Ini halaman about!");
});

app.listen(3000, () => {
	console.log("Server berjalan di http://localhost:3000/");
});
