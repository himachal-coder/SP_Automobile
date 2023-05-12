/*Responsive navbar*/
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=> {
        nav.classList.add('active');
    })
}


if(close){
    close.addEventListener('click',()=> {
        nav.classList.remove('active');
    })
}

/*Booking Form*/

var companyObject = {
      "Bajaj": ["Pulsar","Dominar","Discover","Platina","Chetak","Aspire","Avenger","BYK","Blade","Boxer","CT 100","Caliber","Eliminator","KB 125","Kristal","Sonic","Vikranta","Wind","XCD"],
      "Yamaha": ["FZ","MT15","R15","Fascino","Alpha","Enticer","Fazer","Gladiator","Libero","RAY","RX","RXG","RAY Z","SS125","SZ","Salute","YBR","YZF R15"],
      "Honda": ["Shine","H'ness","Activa","Aviator","CBR150R","CD 110 DREAM","Dio","Livo","Shine","Stunner","Trunner","Twisted","Unicorn"],
      "Mahindra":["Duro","Gustavo","Nova","Rodero"],
      "KTM":["200Duke","390Duke","RC200","RC390"],
      "Royal Enfield":["Bullet 350","Bullet 500","Campus","Classic 350","Classic 500","Classic Battle Green","Classic Chrome","Classic Desert Storm","Continental GT","thunderbird"],
      "Suzuki":["Access","Bandit","Fierro","GS1050R","Gixxer","Hayate","Heat","Inazuma","Lets","Samurai","Zeus 125","Skydrive","Samurai"],
      "TVS":["Apache RTR 160","Apache RTR 180","Centra","Fiero","Flame","Jive","Jupiter","Max 100","Max 100","Max 4R","Phonix","Scooty","Victor","Wego"],
    }
  
  window.onload = function() {
    var companySel = document.getElementById("company");
    var modelSel = document.getElementById("model");
    for (var x in companyObject) {
      companySel.options[companySel.options.length] = new Option(x, x);
    }
    companySel.onchange = function() {
      modelSel.length = 1;

      var y = companyObject[this.value];

      for (var i = 0;i<y.length;i++) {
        modelSel.options[modelSel.options.length] = new Option(y[i], y[i]);
      }
    }

    
  }

/*Register form*/

document.getElementById('regBtn').disabled = true;
document.getElementById('regBtn').style.opacity = (0.4);

function matchPassword() {
 
    var pass = document.getElementById('pswrd').value;
    var confirm_pass = document.getElementById('confPswrd').value;
    var sub = document.getElementById('regBtn');
    if (pass != confirm_pass) {
        document.getElementById('wrong_pass_alert').style.color = 'red';
        document.getElementById('wrong_pass_alert').innerHTML
          = '☒ Use same password';
        document.getElementById('regBtn').disabled = true;
        document.getElementById('regBtn').style.opacity = (0.4);
      } else {
        document.getElementById('wrong_pass_alert').style.color = 'green';
        document.getElementById('wrong_pass_alert').innerHTML =
            '🗹 Password Matched';
        document.getElementById('regBtn').disabled = false;
        document.getElementById('regBtn').style.opacity = (1);
    }
}

// remove product from cart

$('a#anchorRed').click(function(){
  $('#remPro').submit();
  return false;
});