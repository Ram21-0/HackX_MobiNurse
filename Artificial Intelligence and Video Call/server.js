let express = require( 'express' );
const cors = require("cors");
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );
const PDFDOCUMENT = require("pdfkit");
const nodemailer = require("nodemailer")
const fs = require("fs")

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

var port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended:true 
   }));
  //  app.use(cors({ origin: 'http://localhost:3000' , credentials :  true}));
app.use(bodyParser.json());

const {PythonShell} = require('python-shell');
const { getMaxListeners } = require('process');

function capitalize(str) {
    if(!str) return ""
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

app.post("/genPDF",(req,res)=>{
    console.log(req.body);

    let pdfDoc = new PDFDOCUMENT;
    pdfDoc.pipe(fs.createWriteStream('images.pdf'));

    pdfDoc.image('images/mobitemp3.png', 0, 0, {width: 615});
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();

    // pdfDoc.image('images/2022293.jpg', 0, 300, {width: 615});

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Patient Name");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(req.body.name.name));
    pdfDoc.moveDown();

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Age");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(req.body.age.age);
    pdfDoc.moveDown();

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Gender");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(req.body.gender.gender));
    pdfDoc.moveDown();

    // pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text("-------------------------------------------------------", 37, 170);
    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Symptoms");
    
    let val = 1;
    let obj = req.body.symptoms
    let cursor = 240
    for(let symptom in obj){
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(obj[symptom]));
      cursor += 20
      val++;
    }
    pdfDoc.moveDown();

    cursor += 40
    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Disease");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(req.body.disease.disease));
    pdfDoc.moveDown();

    cursor += 40

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Medication");

    val = 1;
    obj = req.body.medication
    
    for(let med in obj){
      cursor += (val - 1) * 40
      console.log(obj[med]);
      let medicine = Object.keys(obj[med])[0]
      let mm = obj[med][medicine]
      // console.log(mm);
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(medicine));
      cursor += 20
      pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.dosage_frequency));
      cursor += 20
      pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.duration));
      cursor += 20
      pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.dosage));
      val++;
      pdfDoc.moveDown();
    }


    cursor += 40

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Advices");

    
    val = 1;
    obj = req.body.advice
    for(let adv in obj){
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(obj[adv]);
      cursor += 20
      val++;
    }



    pdfDoc.end();
    return res.json({status: 'ok'});

  })



app.post("/jsonData",(req,res) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    console.log("py");
    console.log(req.body);
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './ml', //If you are having python_test.py script in same folder, then it's optional.
        args: [req.body.url] //An argument which can be accessed in the script using sys.argv[1]
    };
      
    PythonShell.run('server.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected 
          //during execution of script.
          console.log('result: ', result.toString());
          answer = JSON.parse(result.toString())

          console.log(typeof answer);
        //   return res.send(answer)

        //   console.log(req.body);

    let pdfDoc = new PDFDOCUMENT;
    pdfDoc.pipe(fs.createWriteStream('Prescription.pdf'));

    pdfDoc.image('images/mobitemp3.png', 0, 0, {width: 615});
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();

    // pdfDoc.image('images/2022293.jpg', 0, 300, {width: 615});

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Patient Name");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(answer.name.name));
    pdfDoc.moveDown();

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Age");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(answer.age.age);
    pdfDoc.moveDown();

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Gender");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(answer.gender.gender));
    pdfDoc.moveDown();

    // pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text("-------------------------------------------------------", 37, 170);
    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Symptoms");
    
    let val = 1;
    let obj = answer.symptoms
    let cursor = 240
    for(let symptom in obj){
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(obj[symptom]));
      cursor += 20
      val++;
    }
    pdfDoc.moveDown();

    cursor += 40
    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Disease");
    pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(answer.disease.disease));
    pdfDoc.moveDown();

    cursor += 40

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Medication");

    val = 1;
    obj = answer.medication
    
    for(let med in obj){
      cursor += (val - 1) * 40
      console.log(obj[med]);
      let medicine = Object.keys(obj[med])[0]
      let mm = obj[med][medicine]
      // console.log(mm);
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(capitalize(medicine));
      cursor += 20
      if(mm.dosage_frequency)
            pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.dosage_frequency));
      cursor += 20
      if(mm.duration)
            pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.duration));
      cursor += 20
      if(mm.dosage) 
            pdfDoc.font('Helvetica-Oblique').fontSize(12).fillColor('black').text("   - " + capitalize(mm.dosage));
      val++;
      pdfDoc.moveDown();
    }


    cursor += 40

    pdfDoc.font('Helvetica-Bold').fontSize(16).fillColor('black').text("Advices");

    
    val = 1;
    obj = answer.advice
    for(let adv in obj) {
      pdfDoc.font('Helvetica').fontSize(12).fillColor('black').text(obj[adv]);
      cursor += 20
      val++;
    }

    pdfDoc.end();

    let transport = nodemailer.createTransport({
        service : "gmail",
        host: 'smtp.gmail.com',
        // port: 5500,
        // tls: {
        //     rejectUnauthorized: false
        // }
        auth: { 
           user: 'mobinursehealth@gmail.com',
           pass: 'laxminagar'
        }
    });
    // console.log(req.body);
    let to1 = req.body.to1
    let to2 = req.body.to2
    const message1 = {
        from: 'noreply@mobinurse.com', // Sender address
        to: to1,
        subject: 'Mail Testing', // Subject line
        text : "Your Prescription", // Plain text body
        attachments: [{
            filename: 'Prescription.pdf',
            path: './Prescription.pdf',
            contentType: 'application/pdf'
        }]
    };
    const message2 = {
        from: 'noreply@mobinurse.com', // Sender address
        to: to2,
        subject: 'Mail Testing', // Subject line
        text : "Your Diagnosis", // Plain text body
        attachments: [{
            filename: 'Prescription.pdf',
            path: './Prescription.pdf',
            contentType: 'application/pdf'
        }]
    };

    transport.sendMail(message1, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }
    });
    transport.sendMail(message2, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }
    });
    return res.json({status: 'ok'});
    });

})



app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen(port,() => {
  // const portport = serverserver.address().port;
  // console.log(portport);
} );
