// importera moduler
const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// applikationsvariabel
const app = express();

app.use(("/public"),express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));




app.post("/login", function(req,res){

    const user = JSON.parse(req.body.user);
    console.log(user);

    fs.readFile("./.data/users.json", function(err,data){

        if(err) throw err;
        else{
            let users = Array.from(JSON.parse(data.toString()));

            const userExists =  users.find(function(u){
                if(u.email === user.email) return true;
            });
            if(userExists === undefined){
                console.log("Login Failed");
            }
            else{
                console.log("User found")
            }
        }

    });

    //hitta användare i databas med hjälp av email¨
    // om hen finns, kolla lösenord
    // om löseordet är korrekt, skicka medelande samt en JWT
    // om lösnordet är inkorrekt, skicka statusmedelande






});


app.get("/createuser", function(req,res){
    // Manuellt tilverka en ny användare
    let user = {};
    user.email = "Ola@jens.se";
    user.id = Date.now();

    let tmpPassword = "olajensolaola";
    
    bcrypt.genSalt(12,function(err,salt){
        if(err)throw err;
        console.log(salt);

        bcrypt.hash(tmpPassword,salt,function(err,hash){
            if(err) throw err;
            console.log(hash);
            res.send("hello new user");

            // uppdatera vår användare
            user.password = hash;
            saveUser(user);
        });
    });
});





let port = process.env.port || 2006;

app.listen(port, function(){
    console.log(port);
});



//hjälpfunktioner
function saveUser(userObj){

    //const users = Array.from(require("./.data/users.json"));
    let users = "";
    fs.readFile("./.data/users.json", function(err,data){
        let tmpData = data.toString();
        tmpData = JSON.parse(tmpData);
        users = Array.from(tmpData);
   

    users.push(userObj);

    fs.writeFile("./.data/users.json",JSON.stringify(users,null, 2),function(err){
        if(err) console.log("no user added");
        else console.log("user added");

        });
    });
}
