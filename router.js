var express = require('express')
var con = require('./connection')
var router = express.Router()

// get requests
router.get('/about', (req, res)=>{
    res.render('about')
})

router.get('/terms', (req, res)=>{
    res.render('terms')
})


router.get('/privacy', (req, res)=>{
    res.render('privacy')
})


router.get('/account', (req, res)=>{
    res.render('account', {invCred:" "})
})

// router.get('/logout', (req, res)=>{
//     if (req.session.username) {
//         req.session.loggedin = false;
//         req.session.destroy(function(err){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 res.render('index')
//             }
//         })
//     } else {
//         res.json({result: 'ERROR', message: 'User is not logged in.'});
//     }
// })

router.get('/booking', (req, res)=>{
    res.render('booking', {apptStatus: ''})
})

router.get('/cart', (req, res)=>{
    if (req.session.loggedin == true && req.session.cart){
        
        var cart = req.session.cart
        var total = req.session.total
    
    }
    else {

        var cart = []
        var total = 0
        
    }

    res.render('cart', {logCheck: req.session.loggedin, cart: cart, total: total})    
    
})

router.get('/contact', (req, res)=>{
    res.render('contact')
})

router.get('/profile', (req, res)=>{
    if (req.session.loggedin == true) {
        var sql = "select name from users where username = '"+req.session.username+"'"

        con.query(sql, (err, result)=>{
            if(err) throw err
            else{
                if (result.length == 1){
                    var name = result[0].name
                    res.render('profile', {userName: name})
                }
            }
        })    
    } else {
        res.render('profile', {userName: ''})    
    }
    
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/ordPlaced', (req, res)=>{
    const d = new Date();
    ordDt = (d.getDate()+2)+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    
    res.render('ordPlaced', {ordDt: ordDt})
})

router.get('/service', (req, res)=>{
    res.render('service')
})

router.get('/shop', (req, res)=>{
    var sql = 'select * from products where prodId <= 16'
    con.query(sql, (err, result)=>{
        if(err) throw err
        else res.render('shop', {result: result})
    })
})

router.get('/shop2', (req, res)=>{
    var sql = 'select * from products where prodId >= 17'
    con.query(sql, (err, result)=>{
        if(err) throw err
        else res.render('shop2', {result: result})
    })
})

router.get('/p1', (req, res)=>{
    res.render('p1')
})

router.get('/p2', (req, res)=>{
    res.render('p2')
})

router.get('/p3', (req, res)=>{
    res.render('p3')
})

router.get('/p4', (req, res)=>{
    res.render('p4')
})

router.get('/p5', (req, res)=>{
    res.render('p5')
})

router.get('/p6', (req, res)=>{
    res.render('p6')
})

router.get('/p7', (req, res)=>{
    res.render('p7')
})

router.get('/p8', (req, res)=>{
    res.render('p8')
})

router.get('/p9', (req, res)=>{
    res.render('p9')
})

router.get('/p10', (req, res)=>{
    res.render('p10')
})

router.get('/p11', (req, res)=>{
    res.render('p11')
})

router.get('/p12', (req, res)=>{
    res.render('p12')
})

router.get('/p13', (req, res)=>{
    res.render('p13')
})

router.get('/p14', (req, res)=>{
    res.render('p14')
})

router.get('/p15', (req, res)=>{
    res.render('p15')
})

router.get('/p16', (req, res)=>{
    res.render('p16')
})

router.get('/p17', (req, res)=>{
    res.render('p17')
})

router.get('/p18', (req, res)=>{
    res.render('p18')
})

router.get('/p19', (req, res)=>{
    res.render('p19')
})

router.get('/p20', (req, res)=>{
    res.render('p20')
})

router.get('/p21', (req, res)=>{
    res.render('p21')
})

router.get('/p22', (req, res)=>{
    res.render('p22')
})

router.get('/p23', (req, res)=>{
    res.render('p23')
})

router.get('/p24', (req, res)=>{
    res.render('p24')
})

router.get('/p25', (req, res)=>{
    res.render('p25')
})

// post requests
router.post('/register', (req, res)=>{
    var name = req.body.name
    var username = req.body.username
    var pswrd = req.body.pswrd
    var sql = "INSERT INTO users(name, username, pass) VALUES('"+name+"', '"+username+"', '"+pswrd+"')"

    con.query(sql,function(err,result){
        if(err) throw err;
        else res.redirect('account')
    })
})

router.post('/booking', (req, res)=>{
    var service = req.body.service
    var manf = req.body.company
    var model = req.body.model
    var date = req.body.dt
    var name = req.body.name
    var email = req.body.email
    var manf = req.body.company
    var mobile = req.body.phn
    var prob = req.body.prob
    var sql = "insert into appointment values('"+service+"','"+manf+"','"+model+"','"+name+"','"+email+"','"+date+"','"+mobile+"','"+prob+"')"

    con.query(sql,function(err,result){
        if(err) throw err;
        else res.render("booking", {apptStatus: 'Appointment Booked Successfully'})
    })
})

router.post('/account', (req, res)=>{
    var username = req.body.username
    var pswrd = req.body.pswrd
    var sql = "select name from users where username = '"+username+"' and pass = '"+pswrd+"'"

    con.query(sql,function(err,result){
        if(err) throw err
        else {
            if (result.length == 1){
                req.session.loggedin = true;
				req.session.username = username;
                var name = result[0].name;
                res.render("profile", {userName: name})
            } 
            else {
                res.render('account', {invCred: 'Invalid Credentials!!!'})
            }
            res.end()
        }
    })
})

module.exports = router