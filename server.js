var express =  require('express');

var hbs = require('hbs');// gives values. if dis is nt included den d values for eg.title,username wil nt b printed

var path=require('path');  
var bodyParser=require('body-parser');
var usersController = require('./controllers/users');
var app = express();//create a server
app.set('views',path.join(__dirname,'views'));//assigns the path to views folder
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());//optional
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false}));



app.use(express.static('public'));

app.get('/', function(request,response){/*routing*/
    console.log(usersController.getUsers());
response.render('index',{
                title:'home',
                users: users.getUsers
                });
});
app.get('/users/:id',function(request,response){
var user = usersController.getUser(request.params.id);
    response.render('profile',{ //allows to send data(title,user)
    title:"user profile",
        user:user
});
});
/*app.get('/about', function(request,response){
    response.sendfile('./views/aboutus.html');//dsnt allow to send data
});*/
app.get('/login', function(request,response){
    response.render('login',{
                title:'login',
                
                });
});

app.get('/signup', function(request,response){
    response.render('signup',{
                title:'signup',
                
                });
});

app.post('/login',usersController.postLogin);
app.listen(3000);
