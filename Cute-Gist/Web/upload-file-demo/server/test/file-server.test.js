const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const form1 = new FormData();
form1.append("file", fs.createReadStream(path.join(__dirname, "images/image-1.jpeg")));
form1.submit("http://localhost:3000/upload/single", () => {
  console.log("单图上传成功");
});

const form2 = new FormData();
form2.append("file", fs.createReadStream(path.join(__dirname, "images/image-2.jpeg")));
form2.append("file", fs.createReadStream(path.join(__dirname, "images/image-3.jpeg")));
form2.submit("http://localhost:3000/upload/multiple", () => {
  console.log("多图上传成功");
});
