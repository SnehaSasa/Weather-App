
/*async function getData(){
    let res=await fetch('https://jsonplaceholder.typicode.com/users');
    let data=await res.json();
    console.log(data);
    
};*/
let lat;
let lon;
let locationName=document.getElementById("locationName");
let setIcon=document.getElementById("icon");
let desc=document.getElementById("description");
let temperature=document.getElementById("temp");
let miTemp=document.getElementById("minTemp");
let maTemp=document.getElementById("maxTemp");
let windSpd=document.getElementById("windSpeed");



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position =>{
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        console.log(lat,lon);
        //console.log("latitude:" + lat +"longitude" + long); 
    let data=await getWeatherData(lat,lon);
    console.log(data);
    

    var map = L.map('map').setView([lat,lon], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([lat,lon]).addTo(map);
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();

    /*function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }*/
    
    map.on('click', async function(e){
        const data=await getWeatherData(e.latlng.lat, e.latlng.lng);
        marker.setLatLng([e.latlng.lat, e.latlng.lng]);
        marker.bindPopup(`<b>${data.name}</b>`).openPopup();
    });
    

    return data;
    })
};
async function getWeatherData(lat,lon){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c951eb2e82c4c8cb91e4d5fabf091378
    `

    let response=await fetch(api);
    let data=await response.json();

    console.log(data);

    dataHandler(data);
    return data;
}

function dataHandler(data){
    const{temp}=data.main;
    const{description}=data.weather[0];
    //const{name}=data.name;
    const{temp_min, temp_max}=data.main;
    const{speed}=data.wind;
    const{icon}=data.weather[0];

    locationName.innerHTML=data.name;
    desc.innerHTML=description;
    temperature.innerHTML=temp;
    minTemp.innerHTML="Min_temp:"+temp_min;
    maxTemp.innerHTML="Max_temp:"+temp_max;
    windSpeed.innerHTML="Wind speed:"+speed;
    setIcon.style["background"]=`url(${setIconFunction(icon)})`;
    
}

function setIconFunction(icon) {
 
    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/mist.svg",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/mist.svg"
    };
 
    return icons[icon];
}


