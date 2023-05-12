const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const router = require('./router')
var con = require('./connection')

const app = express()

const port = process.env.PORT||5000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

//loading static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:6000000}
}))

app.use('/route', router)


//home route
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res)=>{
    var email = req.body.email

    var sql = "INSERT INTO mails(email) VALUES('"+email+"')"

    con.query(sql,function(err,result){
        if(err) throw err;
        else res.render("index")
    })
})

app.get('/profile', (req, res)=>{
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
})

app.get('/logout', (req, res)=>{
    if (req.session.username) {
        req.session.loggedin = false;
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.render('index')
            }
        })
    } else {
        res.json({result: 'ERROR', message: 'User is not logged in.'});
    }
})

//Cart functionality

function isProductInCart(cart, img){
    for(let i=0; i<cart.length; i++){
        if (cart[i].img == img){
            return true
        }
    }
    return false
}

function calcTotal(cart, req){
    total = 0
    
    for (let i = 0; i < cart.length; i++) {
            total += (cart[i].subTotal)
    }

    req.session.total = total
    return total
}

app.post('/addToCart', (req, res)=>{

    var name = req.body.name
    var quantity = req.body.quantity
    var price = req.body.price
    var img = req.body.image
    var subTotal = price * quantity

    var product = {name: name, quantity:quantity, price:price, img:img, subTotal:subTotal}

    if (req.session.loggedin == true) {
    
        if(req.session.cart){
            var cart = req.session.cart

            if (!isProductInCart(cart, img)){
                cart.push(product);
            }
        }
        else{
            req.session.cart = [product]
            var cart = req.session.cart
        }

        calcTotal(cart, req)

        res.redirect('/route/shop')
    }
    else {
        res.redirect('/route/cart')
    }

})

app.post('/removeProduct', (req, res)=>{
    var img = req.body.img
    var cart = req.session.cart

    for (let i=0; i<cart.length; i++){
        if(cart[i].img == img){
            cart.splice(i, 1)
        }
    }

    calcTotal(cart, req);

    res.redirect('/route/cart')

})

app.post('/editQuantity', (req, res) => {
    var img = req.body.image
    var quantity = req.body.quantity
    var incBtn = req.body.inc
    var decBtn = req.body.dec

    var cart = req.session.cart

    if(incBtn){
        for (let i=0; i<cart.length; i++){
            if(cart[i].img == img){
                cart[i].quantity = parseInt(cart[i].quantity)+1
                cart[i].subTotal = cart[i].quantity * cart[i].price
            }
        }
    }
    if(decBtn){
        for (let j=0; j<cart.length; j++){
            if(cart[j].img == img){
                if(parseInt(cart[j].quantity) > 1){
                    cart[j].quantity = parseInt(cart[j].quantity)-1
                    cart[j].subTotal = cart[j].quantity * cart[j].price
                }
                else{
                    cart.splice(j, 1)
                }
            }
        }
    }

    calcTotal(cart, req);

    res.redirect('/route/cart')
})


app.post('/placeOrder', async (req, res)=> {  

    var oIdRetrieve = "SELECT MAX(orderId) as oid FROM orders;"
    con.query(oIdRetrieve, function(err, result){
        if (err) throw err
        else {
            var ordID = result[0].oid+1
            var cart = req.session.cart
            var username = req.session.username
            var total = calcTotal(cart, req)

            var sql = "insert into orders value("+ordID+", '"+username+"', "+total+", 'Confirmed');"
            con.query(sql, (err, result) => {
                if (err) throw err
            })

            cart.forEach(item => {
                var prImg = item.img
                var sTotal = item.subTotal
                var quant = item.quantity

                var sql2 = "insert into orderedProducts(orderId, username, prodImg, subtotal, quantity) value("+ordID+", '"+username+"', '"+prImg+"', "+sTotal+", "+quant+");"
                con.query(sql2, (err, result) => {
                    if (err) throw err
                })
            }); 
            req.session.cart = []
            req.session.total = 0
            res.redirect('/route/ordPlaced')
        }
    })
    
    

})

app.listen(port, ()=>{console.log('Listening to the server on http://localhost:5000')})