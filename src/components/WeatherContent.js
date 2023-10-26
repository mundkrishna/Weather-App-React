import React, { useEffect, useState } from 'react'
import DefaultCities from './DefaultCities'

export default function WeatherContent() {
    const defaultCity = "Hyderabad";
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState(null);
    const [search, setSearch] = useState(defaultCity);

    useEffect(() => {
        const getWeather = async (cityToSearch) => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=2debf0590c6aca07aa60dd4a3b0b97e8`;
            let response = await fetch(url);
            return await response.json();
        };

        // This method is supposed to prepare landing page
        const prepareLandingPage = async () => {
            // Let's pull info for default city to display on landing page
            const defaultCityResult = await getWeather(search);
            setCity(defaultCityResult.main);
            setCountry(defaultCityResult.sys);

            // Let's pull weather details for default cities to be displayed at the bottom
            const cityResults = [];
            const defaultCities = ['New Delhi', 'Mumbai', 'Hyderabad', 'Bangalore'];
            const weathersOfDefaultCities = defaultCities.map((c) => getWeather(c));
            const defaultCityWeatherResults = await Promise.all(weathersOfDefaultCities);
            defaultCityWeatherResults.forEach(cityResult => {
                cityResults.push({
                    temperature: Math.round(cityResult.main.temp - 273.15),
                    name: cityResult.name,
                    id: cityResult.id,
                    highest: Math.round(cityResult.main.temp_max - 273.15),
                    lowest: Math.round(cityResult.main.temp_min - 273.15),
                    sunrise: new Date(cityResult.sys.sunrise * 1000).toTimeString().split(" ")[0],
                    sunset: new Date(cityResult.sys.sunset * 1000).toTimeString().split(" ")[0],
                });
            });
            console.log(cityResults);
            setSelectedLocations(cityResults);
        }
        prepareLandingPage();
    }, [search])

    const style = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        gap: "10px",
    }

    return (
        <div className={
            `bg-primary p-2 text-dark bg-opacity-50 ${city
                ? ((Math.round(city.temp - 273.15)) > 30
                    ? 'sunny'
                    : 'cold')
                : ''}`
        }>
            <h1 className="main-heading fw-bold fs-2 text-white">☀️ TheWeatherChannel ☁️</h1>
            <div className="location-info" style={style}>
                <form className="d-flex">
                    <input
                        className="form-control"
                        id="cityInput"
                        value={search}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary bg-primary text-dark bg-opacity-25" type="submit">Search</button>
                </form>
                {!city ? (<h2 className="location-heading" style={{ paddingTop: "50px" }}>No Location!</h2>)
                    : (<h2 className="location-heading" style={{ paddingTop: "50px" }}>{search}!</h2>)
                }

                {!city ? (
                    <p>Enter location to get weather</p>
                ) :
                    <>
                        <div
                            className="location-content bg-primary p-2 text-dark bg-opacity-25"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "20px",
                                gap: "10px",
                                width: "300px"
                            }}>
                            <div className="place-details" style={style}>
                                <span>{search}</span>
                                <span>{country.country}</span>
                                <span><strong>{new Date() ? new Date().toGMTString().split("2023")[0].trim() : ""}</strong></span>
                            </div>
                            <div className="temperature-details" style={style}>
                                <h1>{Math.round(city.temp - 273.15)}°C </h1>
                                <span></span>
                                <div>
                                    <span className='mx-1'>H: {Math.round(city.temp_max - 273.15)}°C</span>
                                    <span className='mx-1'>L: {Math.round(city.temp_min - 273.15)}°C</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="default-cities"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "20px",
                                width: "80%"
                            }}>
                            {selectedLocations &&
                                selectedLocations.map((newObj) =>
                                    <DefaultCities
                                        newObj={newObj}
                                        key={newObj.id}
                                    />
                                )}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

