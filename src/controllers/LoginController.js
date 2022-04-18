const { hash } = require('bcrypt');
const  bcript = require('bcrypt');
const session = require('express-session');
const { send } = require('express/lib/response');


function login(req , res){
    if(req.session.loggedin != true){
        res.render('login/index');
    }else{
        res.redirect('/');
    }
    
}
function addYourCar(req, res){
    res.render('car/add');
}
function addCar(req, res){
    if(req.session.loggedin != true){
        res.redirect('/login');
        
    }else{
        res.render('car/add');
    }
    
    
    
}
function addStore(req, res){
    
    const {matricula, tipo} = req.body;
    const newList = {
        matricula,
        tipo,
        /* user_id: req.session.id, */

    };
    
    console.log(newList);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO cars SET ?', [newList]);
        res.redirect('/add');
        
        
    });
}
function mycarlist(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM cars', (err, userdata) => {
            res.render('car/mycar', {userdata: userdata});
        });
        
        
    });
}

function auth(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if(userdata.length > 0 ){
                userdata.forEach(element => {
                    bcript.compare(data.password, element.password, (err, isMath) => {
                        if(!isMath){
                            res.render('login/index', {error: 'Error incorrect pasword'});
                        }else{
                            req.session.loggedin = true;
                            req.session.name = element.name;

                            res.redirect('/');
                        }
                    });
                    
                });
                
            }else{
                res.render('login/index', {error: 'Error not exist !'});
            };
        });
    });
    
}



function register(req , res){
    if(req.session.loggedin != true){
        res.render('login/register');
    }else{
        res.redirect('/');
    }
}

function storeUser(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if(userdata.length > 0 ){
                res.render('login/register', {error: 'Error user already exist !'});
            }else{
                bcript.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            res.redirect('/');
                        });
                    });
                });
            };
        });
    });
    
    
}
function logout(req, res){
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login');
}



module.exports = {
    login,
    register,
    storeUser,
    auth,
    logout,
    addCar,
    addStore,
    mycarlist,
    addYourCar,
}