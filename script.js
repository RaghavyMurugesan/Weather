// FORAMTTING DEFAULT TIME VALUES
var date = new Date().toDateString();
var time = new Date().toLocaleTimeString();
document.getElementById("date").innerHTML = date;
document.getElementById("time").innerHTML = time;
let weatherdata;
let input = document.getElementById("userinput");
input.addEventListener("keyup", function (event = KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click("getweather()");
    //console.log(event.key)
  }
});
// GETTING THE WEATHER DATA USING API
async function getweather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b0ee5c14570938526ee0c51c15bf6b9e&units=metric`;
    const response = await fetch(url);
    weatherdata = await response.json();
    result.innerHTML = "";
    console.log(weatherdata);
    displayweather();
  } catch (error) {
    displayError();
  }
}
// FUNCTION TO DISPLAY THE RESULT
function displayweather() {
  let input = document.getElementById("userinput").value;
  const weatherinfo = document.getElementById("result");
  const icon = weatherdata.weather[0].icon;
  console.log(input);
  weatherinfo.innerHTML += `<div class="container-fluid">
  <div class="row">
      <h2 class="display-3"> <i class="bi bi-geo-alt-fill"></i> ${weatherdata.name},${weatherdata.sys.country}</h2>
      <div class="col-sm-6">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
          <h3>${weatherdata.weather[0].main}<span>
                  <p>(${weatherdata.weather[0].description})</p>
              </span></h3>
      </div>

      <div class="col-sm-6">
          <h1 class="display-3">${weatherdata.main.temp}°C</h1>
      </div>
  </div>
  <div class="row">
      <div class="col-sm-5 col-lg-2">
          <h2> <i class="bi bi-thermometer-half"></i> ${weatherdata.main.temp}°C</h2>
          <p>TEMPERATURE</p>
      </div>
      <div class="col-sm-5 col-lg-2">
          <h2> <i class="bi bi-droplet-fill"></i> ${weatherdata.main.humidity}%</h2>
          <p>HUMIDITY</p>
      </div>
      <div class="col-sm-5 col-lg-2">
          <h2> <i class="bi bi-speedometer"></i> ${weatherdata.main.pressure} MB</h2>
          <p>PRESSURE</p>
      </div>
      <div class="col-sm-5 col-lg-2">
          <h2><i class="bi bi-wind"></i> ${weatherdata.wind.speed}MPS </h2>
          <p>WIND SPEED</p>
      </div>
  </div>
</div>`;
  document.getElementById("userinput").value = "";
}

//FUNCTION TO DISPLAY THE ERRORS
function displayError() {
  const error = document.getElementById("result");
  error.innerHTML = `<div>
  <h1>${weatherdata.message}<br><p>Try searching with different City</p></h1>
  </div>`;
}
