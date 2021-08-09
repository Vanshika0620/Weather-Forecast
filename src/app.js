const path = require('path')
const express = require('express')   //function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


//setup handlebars engines and views location
app.set('view engine','hbs')   //Tells express which templating engine we installed
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//sets path to public folder and make documents static
app.use(express.static(publicDirectoryPath))  


app.get('',(req,res)=>{
  res.render('index',{    //to render/provide views
    title:"Weather",
    name: "Vanshika"
  })    
})

app.get('/about',(req,res)=>{
  res.render('about',{    
    title:"About Us",
    name: "Vanshika"
  })    
})

app.get('/help',(req,res)=>{
  res.render('help',{ 
    title: "Help",   
    msg: "This is Help Section",
    name: "Vanshika"
  })    
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: "Please enter an address"
    })
  }

  geocode(req.query.address,(error, {Latitude,Longitude,location} = {}) => {      //{}-setting default object
    if(error){
      return res.send({error})
    }

    forecast(Latitude,Longitude,(error,forecastData) => {
      if(error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })


})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title: "404",
    name: 'Vanshika',
    errorMessage: "Help article not found"
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title: "404",
    name: 'Vanshika',
    errorMessage: "page not found"
  })
})

app.listen(3000,()=>{
  console.log("It's Workingg")
})

