let forecastChart;

function drawForecastChart(data){
    const labels = [];
    const temps = [];

    for(let i=0;i<data.list.length;i+=8){

        labels.push(
            new Date(data.list[i].dt_txt)
            .toLocaleDateString("en-US",{weekday:"short"})
        );

        temps.push(
            Math.round(data.list[i].main.temp)
        );

    }
    const canvas = document.getElementById("forecastChart");
    const ctx = canvas.getContext("2d");

    if(forecastChart){
        forecastChart.destroy();
    }

    const gradient = ctx.createLinearGradient(0,0,0,350);

    gradient.addColorStop(0,"rgba(0,255,255,.9)");
    gradient.addColorStop(.5,"rgba(0,153,255,.4)");
    gradient.addColorStop(1,"rgba(0,153,255,0)");

    forecastChart = new Chart(ctx,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"Temperature",

                data:temps,

                borderColor:"#00E5FF",

                borderWidth:5,

                fill:true,

                backgroundColor:gradient,

                tension:.45,

                pointRadius:7,

                pointHoverRadius:10,

                pointBackgroundColor:"#ffffff",

                pointBorderColor:"#00E5FF",

                pointBorderWidth:3

            }]

        },

        options:{

            responsive:true,
            maintainAspectRatio:false,

            animation:{
                duration:1800
            },

            plugins:{
                legend:{
                    display:false
                }
            },

            scales:{

                x:{
                    ticks:{color:"#fff"},
                    grid:{display:false}
                },

                y:{
                    ticks:{color:"#fff"},
                    grid:{
                        color:"rgba(255,255,255,.08)"
                    }
                }

            }

        }

    });

}

async function loadForecast(city){

    const data = await getForecast(city);

    drawForecastChart(data);

    const container = document.getElementById("forecastCards");

    container.innerHTML = "";

    const days = {};

    data.list.forEach(item=>{

        const date = item.dt_txt.split(" ")[0];

        if(!days[date] && item.dt_txt.includes("12:00:00")){

            days[date]=item;

        }

    });

    Object.values(days).slice(0,5).forEach(day=>{

        container.innerHTML += `

        <div class="forecast-card">

            <h3>${new Date(day.dt_txt).toLocaleDateString("en-US",{weekday:"short"})}</h3>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <h2>${Math.round(day.main.temp)}°C</h2>

            <p>${day.weather[0].main}</p>

        </div>

        `;

    });

}