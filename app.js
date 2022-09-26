const express = require('express')
var exphbs = require('express-handlebars')
const path = require("path")
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();
const password = process.env.PASSWORD;

const app = express();
var hbs = exphbs.create({ /* config */})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false}))

//static folder
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/send',(req,res)=>{
    const output = `
    <p><b>Spectrun Pharmacy</b> you have a new message request</p>
    <h3>Contact Details</h3>
    <ul> 
        <li>Name : ${req.body.name}</li>
        <li>Subject : ${req.body.subject}</li>
        <li>email : ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'officialsam371@gmail.com',
            pass:password
        }
    }) 
    const mailOptions = {
        from:'officialsam371@gmail.com',
        to: 'Chukwumasamuel371@gmail.com',
        subject:'Spectrum Pharmacy',
        html: output
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
        res.render('contact', {msg: 'email has been sent'})
    })
})

app.post('/appointment',(req,res)=>{
    const output = `
    <p><b>Spectrun Pharmacy</b> you have a new Appointment request</p>
    <h3>Contact Details</h3>
    <ul> 
        <li>Name : ${req.body.fullnamename}</li>
        <li>email : ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'officialsam371@gmail.com',
            pass:password
        }
    }) 
    const mailOptions = {
        from:'officialsam371@gmail.com',
        to: 'Chukwumasamuel371@gmail.com',
        subject:'Spectrum Pharmacy',
        html: output
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
        res.render('index', {msg: 'Appointment has been sent'})
    })
});

app.use('/spectrum', require('./controller/routes'))
app.listen(3000,()=>{
    console.log("server is listening to 3000");
});