//*
Highcharts.chart('container-1', {
    chart: {
        type: 'bar'
    },
    xAxis: {
        categories: ['Apples', 'Pears', 'Bananas', 'Oranges']
    },
    accessibility: {
        enabled: false
    },
    title: {
        text: 'Highcharts with rounded corners'
    },
    plotOptions: {
        series: {
            borderRadius: `${document.getElementById('range').value}%`,
            borderWidth: 2,
            borderColor: '#666',
            dataLabels: {
                enabled: true
            },
            stacking: 'normal'
        }
    },
    series: [{
        data: [50],
        name: 'Norway'
    }],
    _series: [{
        data: [50, -50, 500, -90],
        name: 'Norway'
    }, {
        data: [50, 250, 260, -50],
        name: 'Sweden'
    }, {
        data: [150, 20, 30, -120],
        name: 'Denmark'
    }],
    colors: ['#d7bfff', '#af80ff', '#5920b9', '#48208b']
});

// */

document.querySelectorAll('button.corner-radius').forEach(btn => {
    btn.addEventListener(
        'click',
        () => {
            Highcharts.charts.forEach(chart => {
                chart.update({
                    plotOptions: {
                        series: {
                            borderRadius: btn.dataset.value
                        }
                    }
                });
            });
        }
    );
});

document.querySelectorAll('button.inverted').forEach(btn => {
    btn.addEventListener(
        'click',
        () => {
            Highcharts.charts[0].update({
                chart: {
                    inverted: btn.dataset.value === 'true'
                }
            });
        }
    );
});

document.querySelectorAll('button.polar').forEach(btn => {
    btn.addEventListener(
        'click',
        () => {
            Highcharts.charts[0].update({
                chart: {
                    polar: btn.dataset.value === 'true'
                }
            });
        }
    );
});

const label = document.querySelector('label[for="range"]');
const updateLabel = input => {
    label.innerText = `${input.value}%`;

    const position = (input.value - input.min) / (input.max - input.min),
        percent = Math.round(position * 100),
        pxAdjust = Math.round(label.offsetWidth * position);
    label.style.left = `calc(${percent}% - ${pxAdjust}px)`;
};
updateLabel(document.getElementById('range'));

document.getElementById('range').addEventListener('input', e => {
    updateLabel(e.target);

    Highcharts.charts.forEach(chart => {
        chart.update({
            plotOptions: {
                series: {
                    borderRadius: `${e.target.value}%`
                }
            }
        }, undefined, undefined, false);
    });
});

//*
Highcharts.chart('container-2', {
    chart: {
        type: 'pie',
        height: 500
    },
    xAxis: {
        categories: ['Apples', 'Pears', 'Bananas', 'Oranges']
    },
    accessibility: {
        enabled: false
    },
    title: {
        text: 'Pie with rounded corners'
    },
    plotOptions: {
        series: {
            borderRadius: `${document.getElementById('range').value}%`,
            borderWidth: 2,
            borderColor: 'white',
            dataLabels: {
                enabled: false
            },
            size: '80%',
            innerSize: '50%'
        }
    },
    series: [
        {
            data: [{
                y: 1,
                sliced: true
            }, 3, 2, 4],
            name: 'Norway'
        }
    ],
    colors: ['#d7bfff', '#af80ff', '#5920b9', '#48208b']
});
// */
/*
const renderer = new Highcharts.Renderer(
    document.getElementById('container-1'),
    400,
    400
);

renderer.arc(200, 200, 200, 0, -Math.PI / 2, 0).attr({
    fill: '#d7bfff',
    stroke: 'black',
    'stroke-width': 1,
    borderRadius: 200
}).add();
*/