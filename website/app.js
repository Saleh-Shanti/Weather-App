// Define The DOM variables

const weather =document.querySelector('.weather');
const generatebtn=document.querySelector('#generate');
const errorSpan=document.querySelector('.error-text');

// for the weather Icon
const iconUrl='http://openweathermap.org/img/w/';

// API cred.
const API_ID='&appid=fd2b67c96a80c316b607d29e77420276';
const URL='https://api.openweathermap.org/data/2.5/weather?zip=';

// To use it with the finalData Array
let counter=0;

// Hide the section Of the weather Info and the Error span
weather.classList.toggle('hide');
errorSpan.classList.toggle('hide');

//---------- ASYNC functions to get and post data  -----------//

// Get Weather Data from openweather map API
const getWeather= async (URL,zip,API_ID)=>{

  const result = await fetch(URL+zip+',us'+API_ID+'&units=metric')
  try {
    const data = await result.json();

    // if the result was invalid (ZIP CODE)
    if (data.cod==400 || data.cod==404 )
      { 
        // Show the Error span with the error message
        errorSpan.classList.remove('hide');
        errorSpan.innerText=data.message
      }
    else{
          return data;
        }
    
  }  catch(error) {
    console.log('error',error);
  }
}


// Post Data and store it on the server
const postData=async(url,data={})=>
 {
    const res=await fetch(url,{
      method:'POST',
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json',
              },
      body: JSON.stringify(data),
    });
    try{
      const newdata=await res.json();
      return newdata;
    }
    catch(error){console.log('error',error)}
 }

// Update UI Elements with the new data
const Update= async ()=>
{
  const result= await fetch('weather')
  try{
  
    const Finaldata=await result.json();
    weather.classList.remove('hide');
    errorSpan.classList.add('hide');    
    document.querySelector('.location').innerText=Finaldata[counter].name;
    document.querySelector('#date').innerText=new Date(Finaldata[counter].date*1000).toDateString()
    document.querySelector('#temp').innerHTML=Math.floor(Finaldata[counter].temp);
    document.querySelector('.weather-icon').src=Finaldata[counter].icon;
    document.querySelector('#content').innerText=Finaldata[counter].feeling; 
    console.log(Finaldata[counter]);
    counter++;
  }
catch(error){console.log('error',error)}

  
}



const generate=()=>
{
  const zip=document.querySelector('#zip').value;
  const feelings=document.querySelector('#feelings').value;

  getWeather(URL,zip,API_ID)
  .then((data)=>
    {
      postData('/country-weather',{name:data.name,date:data.dt,temp:data.main.temp,icon:`${iconUrl}${data.weather[0].icon}.png`,feeling:feelings
    })
  .then(Update());
  });
};


// Event Listner to generate button 
generatebtn.addEventListener('click',generate);

