// const fs = require("fs");
// const axios = require("axios");

// async function downloadImage(url, filename) {
// 	const response = await axios.get(url, { responseType: "arraybuffer" });

// 	fs.writeFile(filename, response.data, (err) => {
// 		if (err) throw err;
// 		console.log("Image downloaded successfully!");
// 	});
// }

// downloadImage(
// 	"https://i.ytimg.com/vi/UbXYxaf1itQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA0Jn21Q3LRJrIFiKbPXtvK05iZTQ",
// 	"image.jpg"
// );
const axios = require("axios");

axios.get("http://localhost:5173").then((res) => console.log(res.data));
