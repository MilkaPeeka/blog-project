const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bp.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Yuval:Test-123@cluster0.dcwwtsq.mongodb.net/todoDB");

const postSchema = new mongoose.Schema({
    title: String,
    text: String
});

const Post = mongoose.model("post", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const items = [{title: "Home", text: homeStartingContent}];

Post.find({}).then((results) => {
    results.forEach((result) => items.push(result));
}).catch((err) => {
    throw err;
});


app.get('/', (req, res) => {
    const data = {
    items: items,
    };
    res.render("index", data);
});

app.get('/about_us', (req, res) => {
    const data = {
    item: {
        title: "About Us",
        text: aboutContent,
    },
    title: "About Us"};
    res.render("web-information", data);
});
app.get('/contact_us', (req, res) => {
    const data = {
    item: {
        title: "Contact Us",
        text: contactContent,
        showMore: false
    },
    title: "Contact Us"};
    res.render("web-information", data);
});


app.get("/compose", (req,res) => {
    res.render("compose");
});

app.post("/compose", (req,res) => {
    items.push(new Post({
        title: req.body.title,
        text: req.body.text,
    }));
    items[items.length - 1].save();
    res.redirect("/");
});

app.get("/show/:index", (req, res) => {
    const index = parseInt(req.params.index);
    res.render("web-information", {item: items[index], title: items[index].title})


});


app.listen("3000", () => {
    console.log("listening on 3000");
});