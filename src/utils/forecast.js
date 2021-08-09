const request=require('request')




const forecast=(latitude,longitude,callback)=>{
  const url = "http://api.weatherstack.com/current?access_key=dbbe1f81e989cec7c62d30abb511ff75&query="+latitude+","+longitude+"&units=s"

  request({url,json:true},(error,{body}={})=>{   // Destructuring and property shorthand are used..compare with comments above
    if(error){
      callback("Can not connect",undefined)
    }
    else if(body.error){
      callback("Can not find the location",undefined)
    }else{
      
      callback(undefined,body.current.weather_descriptions[0]+".The temp today is "+body.current.temperature+ " but it feels like "+ body.current.feelslike)
    }
  })
}

module.exports = forecast