document.getElementById('loading-spinner').style.display = 'block';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const iframeSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

        const mapIframe = document.getElementById('mapIframe');
        mapIframe.src = iframeSrc;


        const divs = `
                            <button class ='Lat'>Lat: ${latitude}</button> <button class ='Lat'>Long: ${longitude}</button>
                        `;

        document.getElementById('loading-spinner').style.display = 'none';

        document.getElementById('coordinates').innerHTML = divs;

        const apiKey = 'd3ec38225a9195d2f4c2fccb102316ae';
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                // document.getElementById('jsonData').innerHTML = `<div>${data}</div>`;

                const hours = Math.floor(data.timezone / 3600);
                const minutes = Math.floor((data.timezone % 3600) / 60);
                const timez = hours >= 0 ? `GMT +${hours}:${minutes}` : `GMT${hours}:${minutes}`;

                const windDirectionDegrees = data.wind.deg;

                function getCardinalDirection(degrees) {
                    const directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
                    const index = Math.round((degrees % 360) / 45);
                    return directions[index % 8];
                }

                const cardinalDirection = getCardinalDirection(windDirectionDegrees);

                const tagData = `
                            <h2 id = "ywd">Your Weather Data</h2>
                            <button class ='Lat'>Location: ${data.name}</button>
                            <button class ='Lat'>Wind Speed: ${data.wind.speed} kmph</button>
                            <button class ='Lat'>Humidity: ${data.main.humidity}</button>
                            <button class ='Lat'>Time Zone: ${timez}</button>
                            <button class ='Lat'>Pressure: ${data.main.pressure / 100} atm</button>
                            <button class ='Lat'>Wind Direction: ${cardinalDirection}</button>
                            <button class ='Lat'>Max Temp : ${data.main.temp_max}&deg;C</button>
                            <button class ='Lat'>Feels Like: ${data.main.feels_like}&deg;C</button>
                        `;

                document.getElementById('jsonData').innerHTML = tagData;

                // console.log('Weather data:', data);
            }).catch((error) => {
                alert('Error fetching weather data:', error);
            });

    }, (error) => {
        alert('Error fetching location:', error);
    });
} else {
    console.error('Geolocation is not available in this browser.');
}

// api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
// https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API key}&units=metric
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d3ec38225a9195d2f4c2fccb102316ae