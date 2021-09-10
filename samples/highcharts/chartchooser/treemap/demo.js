const colors = [
    "#E59866",
    "#F8C471",
    "#F7DC6F",
    "#82E0AA",
    "#73C6B6",
    "#85C1E9",
    "#BB8FCE",
    "#F1948A",
    "#B2BABB"
];

Highcharts.getJSON(
    "https://cdn.jsdelivr.net/gh/highcharts/highcharts@dac9b997d8/samples/data/denmark-export-2018.json",

    function (dataJson) {
        Highcharts.chart("container", {
            accessibility: {
                screenReaderSection: {
                    beforeChartFormat:
            "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div>"
                },
                description:
          "Tree map detailing exported goods from Denmark in 2018. The services category is the largest, and makes up 39% of the total export. Transport services are the most exported. Chemicals are the second most exported category with 13%, then agriculture with 12%, and machinery with 10%. The other categories are textiles, electronics, metals, minerals, vehicles, stone, and other."
            },
            colors: colors,
            series: [
                {
                    name: "Export",
                    type: "treemap",
                    layoutAlgorithm: "squarified",
                    allowDrillToNode: true,
                    turboThreshold: Infinity,
                    dataLabels: {
                        enabled: false,
                        crop: true
                    },
                    borderColor: "black",
                    levels: [
                        {
                            level: 1,
                            colorByPoint: true,
                            dataLabels: {
                                enabled: true,
                                format: "{point.name} {point.value:.0f}%",
                                style: {
                                    textOutline: false,
                                    fontSize: 18
                                },
                                zIndex: 9
                            },
                            borderWidth: 3
                        },
                        {
                            level: 2,
                            dataLabels: {
                                enabled: false
                            },
                            borderWidth: 1
                        }
                    ],
                    data: dataJson
                }
            ],
            title: {
                text: "Denmark Export 2018"
            },
            subtitle: {
                useHTMl: true,
                text: "Source: Harvard.edu"
            },
            tooltip: {
                useHTML: true,
                valueDecimals: 2,
                pointFormat: "<b>{point.name}</b>: <b>{point.value}%"
            }
        });
    }
);
