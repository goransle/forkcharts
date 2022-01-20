QUnit.test('MapBubble', function (assert) {
    const chart = Highcharts.mapChart('container', {
            series: [
                {
                    mapData: Highcharts.maps['countries/gb/gb-all']
                },
                {
                    type: 'mapbubble',
                    lineWidth: 2,
                    data: [
                        {
                            lat: 51.507222,
                            lon: -0.1275,
                            z: 3
                        },
                        {
                            lat: 52.483056,
                            lon: -1.893611,
                            z: 4
                        },
                        {
                            x: 1600,
                            y: -3500,
                            z: 3
                        },
                        {
                            x: 2800,
                            y: -3800,
                            z: 1
                        }
                    ]
                }
            ]
        }),
        controller = new TestController(chart);

    assert.strictEqual(
        chart.series[1].graph['stroke-width'],
        2,
        'MapBubble with linewidth- points should have stroke width.'
    );

    chart.update({
        tooltip: {
            shared: true
        }
    });
    // Hover over the chart.
    controller.mouseMove(200, 200);
    assert.ok(
        true,
        `When hovering over mapbubble series with shared tooltip,
        there should be no errors in the console.`
    );
});
