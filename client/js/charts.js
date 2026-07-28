let tempChart;
let aqiChart;

const tempHistory = [];
const aqiHistory = [];
const labels = [];
function updateCharts(temp, aqi, city) {

    if (labels.length >= 7) {
        labels.shift();
        tempHistory.shift();
        aqiHistory.shift();
    }

    labels.push(city);
    tempHistory.push(temp);
    aqiHistory.push(aqi);

    drawTempChart();
    drawAQIChart();
}

function drawTempChart() {

    const canvas = document.getElementById("tempChart");
    const ctx = canvas.getContext("2d");

    if (tempChart) tempChart.destroy();

    const gradient = ctx.createLinearGradient(0,0,0,400);

    gradient.addColorStop(0,"rgba(255,80,80,.85)");
    gradient.addColorStop(.5,"rgba(255,170,0,.45)");
    gradient.addColorStop(1,"rgba(255,80,80,0)");

    tempChart = new Chart(ctx,{

        type:"line",

        data:{
            labels,
            datasets:[{
                label:"Temperature (°C)",
                data:tempHistory,

                borderColor:"#ff5a5f",
                backgroundColor:gradient,

                fill:true,

                borderWidth:5,

                tension:.45,

                pointRadius:8,
                pointHoverRadius:11,

                pointBackgroundColor:"#fff",
                pointBorderColor:"#ff5a5f",
                pointBorderWidth:3

            }]
        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            animation:{
                duration:1800,
                easing:"easeOutQuart"
            },

            plugins:{

                legend:{
                    display:false
                },

                tooltip:{
                    backgroundColor:"#111827",
                    padding:12,
                    titleColor:"#fff",
                    bodyColor:"#fff",
                    cornerRadius:10
                }

            },

            scales:{

                x:{
                    ticks:{
                        color:"#ffffff",
                        font:{
                            size:13,
                            weight:"bold"
                        }
                    },
                    grid:{
                        display:false
                    }
                },

                y:{
                    ticks:{
                        color:"#ffffff"
                    },
                    grid:{
                        color:"rgba(255,255,255,.08)"
                    }
                }

            }

        }

    });

}

function drawAQIChart(){

    const canvas=document.getElementById("aqiChart");
    const ctx=canvas.getContext("2d");

    if(aqiChart) aqiChart.destroy();

    const gradient=ctx.createLinearGradient(0,0,0,400);

    gradient.addColorStop(0,"rgba(0,229,255,.95)");
    gradient.addColorStop(.5,"rgba(0,150,255,.45)");
    gradient.addColorStop(1,"rgba(0,229,255,0)");

    aqiChart=new Chart(ctx,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                label:"AQI",

                data:aqiHistory,

                backgroundColor:gradient,

                borderRadius:20,

                borderSkipped:false,

                hoverBackgroundColor:"#00E5FF"

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            animation:{
                duration:1700,
                easing:"easeOutQuart"
            },

            plugins:{

                legend:{
                    display:false
                },

                tooltip:{
                    backgroundColor:"#111827",
                    padding:12,
                    cornerRadius:10
                }

            },

            scales:{

                x:{
                    ticks:{
                        color:"#fff",
                        font:{
                            size:13,
                            weight:"bold"
                        }
                    },
                    grid:{
                        display:false
                    }
                },

                y:{
                    beginAtZero:true,
                    max:5,
                    ticks:{
                        color:"#fff",
                        stepSize:1
                    },
                    grid:{
                        color:"rgba(255,255,255,.08)"
                    }
                }

            }

        }

    });

}