
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port=8080;
const app=express();
let projectData=[];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('website'));

const server =app.listen(port,()=>{

    console.log(`server is running on port ${port}`);

});



// POST Route to save the data 
app.post('/country-weather', addCountry);

function addCountry(req,res){
  
  Data = {
   
     name: req.body.name,
     date: req.body.date,
     icon:req.body.icon,
     temp: req.body.temp,
     feeling: req.body.feeling
  }

  projectData.push(Data);
  console.log(projectData)
}

// Get Route to send data to the browser
app.get('/weather',(req,res)=>{res.send(projectData);})
