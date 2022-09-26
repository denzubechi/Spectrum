const express = require('express');
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index')
});
router.get('/about-us', (req,res)=>{
    res.render('about-us')
});
router.get('/department', (req,res)=>{
    res.render('department')
});
router.get('/blog', (req,res)=>{
    res.render('blog')
});
router.get('/element', (req,res)=>{
    res.render('element')
});
router.get('/single-blog', (req,res)=>{
    res.render('single-blog')
});
router.get('/doctors', (req,res)=>{
    res.render('doctors')
});
router.get('/contact', (req,res)=>{
    res.render('contact')
});

router.post('/newsletter',(req,res)=>{
    const output = `
    <p><b>Spectrun Pharmacy</b> you have a new Newsletter request</p>
    <h3>Contact Details</h3>
    <ul> 
        <li>email : ${req.body.email}</li>
    </ul>
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
        res.render('index', {msg: 'Received, thank you for subscribing!'})
    })
});

module.exports = router