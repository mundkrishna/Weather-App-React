import React from 'react'

export default function DefaultCities({ newObj }) {
    return (
        <div
            className="location-content bg-primary p-2 text-dark bg-opacity-25"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
                width: "500%",
                height: "40vh",
                gap: "30px"
            }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
            }}>
                <span>{newObj.name}</span>
                <span><strong>{newObj.temperature}°C</strong></span>
                <span>
                    <strong>
                        {new Date() ? new Date().toGMTString().split("2023")[0].trim() : ""}
                    </strong>
                </span>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
            }}>
                <div>
                    <span className='mx-1'>H: {newObj.highest}°C</span>
                    <span className='mx-1'>L: {newObj.lowest}°C</span>
                </div>
                <div className='mx-1'>🌅 Sunrise: {newObj.sunrise}</div>
                <div className='mx-1'>🌄 Sunset: {newObj.sunset}</div>
            </div>
        </div>
    )
}