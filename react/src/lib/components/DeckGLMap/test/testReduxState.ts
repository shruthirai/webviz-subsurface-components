export const testState = {
    initialViewState: {
        target: [434962.5, 6478095.5, 0],
        zoom: -3,
    },
    layers: [
        {
            "@@type": "ColormapLayer",
            id: "colormap-layer",
            bounds: [432205, 6475078, 437720, 6481113],
            image: "@@#resources.propertyMap",
            colormap:
                "https://cdn.jsdelivr.net/gh/kylebarron/deck.gl-raster/assets/colormaps/plasma.png",
            valueRange: [2782, 3513],
            pickable: true,
        },
        {
            "@@type": "Hillshading2DLayer",
            id: "hillshading-layer",
            bounds: [432205, 6475078, 437720, 6481113],
            valueRange: [2782, 3513],
            opacity: 1.0,
            image: "@@#resources.propertyMap",
            pickable: true,
        },
        {
            "@@type": "WellsLayer",
            id: "wells-layer",
            data: "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/volve_wells.json",
            logData:
                "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/volve_logs.json",
            opacity: 1.0,
            lineWidthScale: 5,
            logRadius: 6,
            logrunName: "BLOCKING",
            logName: "ZONELOG",
            pointRadiusScale: 8,
            outline: true,
            logCurves: true,
            refine: true,
        },
        {
            "@@type": "FaultPolygonsLayer",
            id: "fault-polygons-layer",
            data: "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/fault_polygons.geojson",
            lineWidthMinPixels: 2,
        },
        {
            "@@type": "PieChartLayer",
            id: "pie-layer",
            data: "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/piechart.json",
        },
        {
            "@@type": "DrawingLayer",
            id: "drawing-layer",
            mode: "drawLineString",
            data: {
                type: "FeatureCollection",
                features: [],
            },
        },
    ],
    views: [
        {
            "@@type": "OrthographicView",
            id: "main",
            controller: {
                doubleClickZoom: false,
            },
            x: "0%",
            y: "0%",
            width: "100%",
            height: "100%",
            flipY: false,
        },
    ],
};
