/**
get: reading
post: creating
app.put:    /users/:userid   update
app.delete: /users/:userid   delete

NODE_ENV=production node app.js
*/

var express = require('express')
	, mongoose = require("mongoose")
	, routes = require('./routes')
	, blog = require('./controllers/blog')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());

	app.use(express.cookieParser());
	app.use(express.session({secret:"#$%"}));
	
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
	app.use(express.errorHandler());
});

//app.get('/', routes.index);
app.get("/me/:name",function(req,res){
	res.send("Hello Niggas"+req.params.name);
});

app.get("/(home)?",function(req,res){
	res.cookie("NodeCookie","Valor en la Cookie de Node")
	var data = {
		"title":"Home Page",
		"cookie": req.cookies.NodeCookie
	};
	//res.clearCookie("cookieName")
	res.render("home",data);
});
app.get("/portfolio",function(req,res){
	var data = {"title":"About Page"};
	res.render("portfolio",data);
});
app.get("/about",function(req,res){
	var data = {"title":"About Page"};
	res.render("about",data);
});
app.get("/creditos",function(req,res){
	var data = {"title":"Creditos"};
	res.render("creditos",data);
});
app.get(/\/users\/?(\d*)\/?(edit)?/,function(req,res){
	res.send("Con Regex Niggas");
});

app.get("/html",function(req,res){
	var texto = [
	"<h1>Me Imperio Niggas</h1>",
	"<h4>Aviles Systems Inc</h4>"
	].join("\n");
	res.send(texto);
});
app.post("/post",function(req,res){
	res.send("Creando un nuevo usuario: "+req.body.username);
});

app.get('/blog', blog.home);
//app.get('/users', user.list);



http.createServer(app).listen(app.get('port'), function(){
console.log("El Servidor esta corriendo en Puerto " + app.get('port'));
});
