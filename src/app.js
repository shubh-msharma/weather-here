let express =  require("express");
let fetch = require('node-fetch');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname,'../public')))

app.get('/weather/:address',async (req,res)=>{

    let coord_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(req.params.address)+".json?access_token=pk.eyJ1Ijoic2h1Ymhjb2Rlcjc3IiwiYSI6ImNrMjV0bDhiZTJ1Y2QzaHBpczlsbnFuZHoifQ.7Z1NFDEltnQqd_NjbR5FIA"

    let map_box_response = await fetch(coord_url);
    let map_box_data = await map_box_response.json();
    if(!map_box_data.features[0].center)
    {
        return  res.send({
            error:"cannot find data"
        })
    }

    let lat = map_box_data.features[0].center[1];
    let lon = map_box_data.features[0].center[0];
    let weather_url = `https://api.darksky.net/forecast/8a400c1f4ddcb162f6297993f8ad7b7a/${lat},${lon}`
    let aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`

    let weather_response = await fetch(weather_url);
    let weather_data = await weather_response.json();

    let aq_response = await fetch(aq_url);
    let aq_data = await aq_response.json();
    let data = {
        weather:weather_data,
        AQ:aq_data,
        ["map box"]:map_box_data.features[0]
    }

    res.send(data);
});


app.listen(3000,()=>{
    console.log("listning at 3000.....");
})