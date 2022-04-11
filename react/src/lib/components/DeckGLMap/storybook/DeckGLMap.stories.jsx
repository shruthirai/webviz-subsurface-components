import React from "react";
import DeckGLMap from "../DeckGLMap";
import exampleData from "../../../../demo/example-data/deckgl-map.json";
//import ColorLegend from "./ColorLegend";
import ColorLegend from "@emerson-eps/color-tables/src/component/Legend/ColorLegend";
const colorTables = require("@emerson-eps/color-tables/src/component/color-tables.json");
import * as d3 from "d3";
import { d3ColorScales } from "@emerson-eps/color-tables/src/component/Utils/d3ColorScale";

export default {
    component: DeckGLMap,
    title: "DeckGLMap",
    argTypes: {
        id: {
            description:
                "The ID of this component, used to identify dash components in callbacks. The ID needs to be unique across all of the components in an app.",
        },

        resources: {
            description:
                "Resource dictionary made available in the DeckGL specification as an enum. \
            The values can be accessed like this: `@@#resources.resourceId`, where \
            `resourceId` is the key in the `resources` dict. For more information, \
            see the DeckGL documentation on enums in the json spec: \
            https://deck.gl/docs/api-reference/json/conversion-reference#enumerations-and-using-the--prefix",
        },

        layers: {
            description:
                "List of JSON object containing layer specific data. \
            Each JSON object will consist of layer type with key as `@@type` and layer specific data, if any.",
        },

        bounds: {
            description:
                "Coordinate boundary for the view defined as [left, bottom, right, top].",
        },

        zoom: {
            description: "Zoom level for the view",
        },

        views: {
            description:
                "Views configuration for map. If not specified, all the layers will be displayed in a single 2D viewport.<br/>" +
                "Options:<br/>" +
                "layout: [number, number] — Layout for viewport in specified as [row, column],<br/>" +
                "viewports: [`ViewportType`] — Layers configuration for multiple viewport,<br/><br/>" +
                "`ViewportType` options: <br/>" +
                "id: string — Viewport id <br>" +
                "name: string — Viewport name <br>" +
                "show3D: boolean — Toggle 3D view <br>" +
                "layerIds: [string] — Layer ids to be displayed on viewport.",
        },

        coords: {
            description:
                "Options for readout panel.<br/>" +
                "visible: boolean — Show/hide readout,<br/>" +
                "multipicking: boolean — Enable or disable multi picking,<br/>" +
                "pickDepth: number — Number of objects to pick.",
        },

        scale: {
            description:
                "Options for distance scale component.<br/>" +
                "visible: boolean — Show/hide scale bar,<br/>" +
                "incrementValue: number — Increment value for the scale,<br/>" +
                "widthPerUnit: number — Scale bar width in pixels per unit value,<br/>" +
                "position: [number, number] — Scale bar position in pixels.",
        },

        coordinateUnit: {
            description: "Unit for the scale ruler",
        },

        legend: {
            description:
                "Options for color legend.<br/>" +
                "visible: boolean — Show/hide color legend,<br/>" +
                "position: [number, number] — Legend position in pixels,<br/>" +
                "horizontal: boolean — Orientation of color legend.",
        },

        colorTables: {
            description:
                "Prop containing color table data." +
                "See colorTables repo for reference:<br/>" +
                "https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json",
        },

        editedData: {
            description:
                "Map data returned via editedData prop.<br/>" +
                "selectedWell: string — Selected well name,<br/>" +
                "selectedPie: object — Selected pie chart data,<br/>" +
                "selectedFeatureIndexes: [number] — Drawing layer data index,<br/>" +
                "data: object — Drawing layer data, indexed from selectedFeatureIndexes.",
        },

        setProps: {
            description: "For reacting to prop changes",
        },
    },
};

// Template for when edited data needs to be captured.
const EditDataTemplate = (args) => {
    const [editedData, setEditedData] = React.useState(args.editedData);
    React.useEffect(() => {
        setEditedData(args.editedData);
    }, [args.editedData]);
    return (
        <DeckGLMap
            {...args}
            editedData={editedData}
            setProps={(updatedProps) => {
                setEditedData(updatedProps.editedData);
            }}
        />
    );
};

// Blank template.
const MinimalTemplate = (args) => {
    return <DeckGLMap {...args} />;
};

// Data for custome geojson layer with polyline data
const customLayerWithPolylineData = {
    "@@type": "GeoJsonLayer",
    id: "geojson-line-layer",
    name: "Line",
    data: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [434000, 6477500],
                        [435500, 6477500],
                    ],
                },
            },
        ],
    },
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
};

// Data for custom geojson layer with polygon data
const customLayerWithPolygonData = {
    "@@type": "GeoJsonLayer",
    id: "geojson-layer",
    name: "Polygon",
    data: {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [434562, 6477595],
                    [434562, 6478595],
                    [435062, 6478595],
                    [435062, 6477595],
                    [434562, 6477595],
                ],
            ],
        },
    },
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getLineColor: [0, 255, 255],
    getFillColor: [0, 255, 0],
    opacity: 0.3,
};

// Data for custom text layer
const customLayerWithTextData = {
    "@@type": "TextLayer",
    id: "text-layer",
    name: "Text",
    data: [
        {
            name: "Custom GeoJson layer",
            coordinates: [434800, 6478695],
        },
    ],
    pickable: true,
    getPosition: (d) => d.coordinates,
    getText: (d) => d.name,
    getColor: [255, 0, 0],
    getSize: 16,
    getAngle: 0,
    getTextAnchor: "middle",
    getAlignmentBaseline: "center",
};

// Layers data for storybook example 1
const layersData1 = [
    customLayerWithPolylineData,
    customLayerWithPolygonData,
    customLayerWithTextData,
];

// Layers data for storybook example 2
const colormapLayer = exampleData[0].layers[0];
const layersData2 = [
    colormapLayer,
    customLayerWithPolylineData,
    customLayerWithPolygonData,
    customLayerWithTextData,
];

const hillshadingLayer = exampleData[0].layers[1];

// Storybook example 1
export const Default = EditDataTemplate.bind({});
Default.args = {
    ...exampleData[0],
};

// Minimal map example.
export const Minimal = () => (
    <DeckGLMap id={"deckgl-map"} bounds={[0, 0, 1, 1]} />
);
Minimal.parameters = {
    docs: {
        description: {
            story: "An example showing the minimal required arguments, which will give an empty map viewer.",
        },
    },
};

// Volve kh netmap data, flat surface
export const KhMapFlat = MinimalTemplate.bind({});
KhMapFlat.args = {
    id: "kh-map-flat",
    resources: {
        propertyMap: "./volve_property_normalized.png",
        depthMap: "./volve_hugin_depth_normalized.png",
    },
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [
        {
            "@@type": "ColormapLayer",
            id: "property_map",
            valueRange: [-3071, 41048],
            bounds: [432150, 6475800, 439400, 6481500],
            image: "@@#resources.propertyMap",
        },
        {
            ...hillshadingLayer,
            valueRange: [2725, 3397],
            bounds: [432150, 6475800, 439400, 6481500],
            opacity: 0.6,
        },
    ],
};
KhMapFlat.parameters = {
    docs: {
        description: {
            story: "An example showing a kh property layer and a depth map hillshading layer.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};

// Map3DLayer. Properties encoded in RGB.
const meshMapLayer = {
    "@@type": "Map3DLayer",
    id: "mesh-layer",
    bounds: [432205, 6475078, 437720, 6481113],
    meshMaxError: 100,
    mesh: "hugin_depth_25_m_normalized_margin.png",
    meshValueRange: [2782, 3513],
    propertyTexture: "kh_netmap_25_m_normalized_margin.png",
    propertyValueRange: [2782, 3513],
    colorMapRange: [2815, 3513],
    colorMapClampColor: [0, 100, 0, 0],
    rotDeg: 0,
    contours: [0, 50.0],
    isContoursDepth: false,
    colorMapName: "Physics",
    //colorMap?: (value: number) => { return colorMapper(value)}
};
export const KhMapMesh = MinimalTemplate.bind({});
KhMapMesh.args = {
    id: "kh-mesh-map",
    layers: [
        {
            ...meshMapLayer,
        },
    ],
    toolbar: {
        visible: false,
    },
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
                layerIds: [],
            },
        ],
    },
};

//Material property may take these values:
//          true  = default material. See deck.gl documentation for what that is. This is default property value.
//          false = no material.
//          Full spec:
//                {
//                    ambient: 0.35,
//                    diffuse: 0.6,
//                    shininess: 32,
//                    specularColor: [255, 255, 255],
//                }
const material = {
    ambient: 0.35,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [255, 255, 255],
};
export const MapMaterial = MinimalTemplate.bind({});
MapMaterial.args = {
    id: "material",
    layers: [{ ...meshMapLayer, material }],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: false,
                layerIds: [],
            },
        ],
    },
};
MapMaterial.parameters = {
    docs: {
        description: {
            story: "An example showing example usage of Map3D material property.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};

const axes = {
    "@@type": "AxesLayer",
    id: "axes-layer",
    bounds: [432205, 6475078, -3500, 437720, 6481113, 0],
};
export const Axes = MinimalTemplate.bind({});
Axes.args = {
    id: "axes",
    layers: [meshMapLayer, axes],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
                layerIds: [],
            },
        ],
    },
};

// GridLayer.
const gridLayer = exampleData[0].layers[2];
export const GridLayer = EditDataTemplate.bind({});
GridLayer.args = {
    ...exampleData[0],
    layers: [
        {
            ...gridLayer,
            visible: true,
        },
    ],
    toolbar: {
        visible: false,
    },
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
                layerIds: [],
            },
        ],
    },
};

// custom layer example
export const UserDefinedLayer1 = EditDataTemplate.bind({});
UserDefinedLayer1.args = {
    id: exampleData[0].id,
    bounds: exampleData[0].bounds,
    layers: layersData1,
};

// custom layer with colormap
export const UserDefinedLayer2 = EditDataTemplate.bind({});
UserDefinedLayer2.args = {
    id: exampleData[0].id,
    resources: exampleData[0].resources,
    bounds: exampleData[0].bounds,
    layers: layersData2,
};

// multiple synced view
export const MultiView = EditDataTemplate.bind({});
MultiView.args = {
    ...exampleData[0],
    legend: {
        visible: false,
    },
    zoom: -5,
    layers: [
        ...exampleData[0].layers,
        customLayerWithPolylineData,
        customLayerWithPolygonData,
        customLayerWithTextData,
    ],
    views: {
        layout: [2, 2],
        showLabel: true,
        viewports: [
            {
                id: "view_1",
                name: "Colormap layer",
                show3D: false,
                layerIds: ["colormap-layer"],
            },
            {
                id: "view_2",
                name: "Hill-shading layer",
                show3D: false,
                layerIds: ["hillshading-layer"],
            },
            {
                id: "view_3",
                name: "All layers",
                show3D: false,
                layerIds: [],
            },
            {
                id: "view_4",
                name: "Custom layer",
                show3D: false,
                layerIds: ["geojson-line-layer", "geojson-layer", "text-layer"],
            },
        ],
    },
};

// Experimental MapLayer. This is newer Float32 resolution for properties.
const mapLayer = {
    "@@type": "MapLayer",
    id: "map-layer-float32",
    mesh: "./volve_hugin_depth_absolute.png",
    bounds: [432205, 6475078, 437720, 6481113],
    meshMaxError: 100,
    propertyTexture: "./volve_property_ieee_float.png",
    rotDeg: 0,
    contours: [0, 20.0],
    colorMapName: "Physics",
    colorMapRange: [-3071, 41048],
};
export const ExperimentalMapLayerFloat32Property = EditDataTemplate.bind({});
ExperimentalMapLayerFloat32Property.args = {
    ...exampleData[0],
    layers: [
        {
            ...mapLayer,
            meshMaxError: 5.0,
            visible: true,
        },
    ],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
                layerIds: [],
            },
        ],
    },
};

ExperimentalMapLayerFloat32Property.parameters = {
    title: "Test",
    docs: {
        description: {
            story: "An experimental layer using a Float 32 encoded property map.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};

// ---------Selectable GeoJson Layer example--------------- //
export const SelectableFeatureExample = (args) => {
    const [editedData, setEditedData] = React.useState(args.editedData);
    React.useEffect(() => {
        setEditedData(args.editedData);
    }, [args.editedData]);
    return (
        <div>
            <DeckGLMap
                {...args}
                editedData={editedData}
                setProps={(updatedProps) => {
                    setEditedData(updatedProps.editedData);
                }}
            />
            <pre>{JSON.stringify(editedData, null, 2)}</pre>
        </div>
    );
};

SelectableFeatureExample.parameters = {
    docs: {
        description: {
            story: "An example showing selectable feature example from the map.",
        },
    },
};

const polylineUsingSelectableGeoJsonLayer = {
    ...customLayerWithPolylineData,
    "@@type": "SelectableGeoJsonLayer",
};

const polygonUsingSelectableGeoJsonLayer = {
    ...customLayerWithPolygonData,
    "@@type": "SelectableGeoJsonLayer",
};

SelectableFeatureExample.args = {
    id: "DeckGL-Map",
    bounds: [432205, 6475078, 437720, 6481113],
    layers: [
        polylineUsingSelectableGeoJsonLayer,
        polygonUsingSelectableGeoJsonLayer,
    ],
};

// Map example with color selector
// colorMap layer arguments
const layers = [exampleData[0].layers[0]];
const id = exampleData[0].id;

// continous legend arguments
// prop for continous legend
var min = 0;
var max = 0.35;
var dataObjectName = "Legend";
var position = [16, 10];
var horizontal = true;
var colorName = "Physics";

// prop for discrete data
var discreteData = {
    "Above_BCU": [[], 0],
    "ABOVE": [[], 1],
    "H12": [[], 2],
    "H11": [[], 3],
    "H10": [[], 4],
    "H9": [[], 5],
    "H8": [[], 6],
    "H7": [[], 7],
    "H6": [[], 8],
    "H5": [[], 9],
    "H4": [[], 10],
    "H3": [[], 11],
    "H2": [[], 12],
    "H1": [[], 13],
    "BELOW": [[], 14]
};

const mapDataTemplate = (args) => {
    const [legendUpdated, setLegendUpdated] = React.useState();

    const colorMapaData = React.useCallback((data) => {
        setLegendUpdated(data);
    }, []);

    const layerDataChanged = [{...args.layers[0], colorMapName: legendUpdated}]

    // const colorMapping = function colorMapping(t) {
    //     return d3.interpolateInferno(t)
    // }

    var d3ColorName = d3ColorScales.find((value) => {
            return value.name == legendUpdated 
    });

    const colorMapping = d3ColorName?.colors

    return <div>
            <div>
                <ColorLegend style={{ float: "right", position:"absolute", zIndex: 999, opacity: 1}} 
                    {...args}
                    getColorMapname={colorMapaData}

                />
            </div>
            <div><DeckGLMap {...args} colorMapping={colorMapping} layers={layerDataChanged} />
            </div>
        </div>;
};

export const ColorSelectorForColorMapLayer = mapDataTemplate.bind({});

ColorSelectorForColorMapLayer.args = {
    min,
    max,
    dataObjectName,
    position,
    horizontal,
    colorName,
    colorTables,
    discreteData,
    ...exampleData[0],
    id: id,
    layers,
};

// colorselector for welllayer

// Map example with color selector
// colorMap layer arguments
const wellLayers = [exampleData[0].layers[4]];
const wellId = exampleData[0].id;

// continous legend arguments
// prop for continous legend
var min = 0;
var max = 0.35;
var dataObjectName = "Legend";
var position = [16, 10];
var horizontal = true;
var colorName = "Rainbow";

// prop for discrete data
var discreteData = {
    "Above_BCU": [[], 0],
    "ABOVE": [[], 1],
    "H12": [[], 2],
    "H11": [[], 3],
    "H10": [[], 4],
    "H9": [[], 5],
    "H8": [[], 6],
    "H7": [[], 7],
    "H6": [[], 8],
    "H5": [[], 9],
    "H4": [[], 10],
    "H3": [[], 11],
    "H2": [[], 12],
    "H1": [[], 13],
    "BELOW": [[], 14]
};

const wellLayerTemplate = (args) => {
    const [wellLegendUpdated, setWellLegendUpdated] = React.useState();
    //const [wellLegendUpdated, setWellLegendUpdated] = React.useState<() => any>(undefined);

    const wellLayerData = React.useCallback((data) => {
        //setWellLegendUpdated(() => data);
       setWellLegendUpdated(data);
    }, []);

    // const colorMapping = function colorMapping(t) {
    //     return d3.interpolateInferno(t)
    // }

    //console.log('wellLegendUpdated', wellLegendUpdated)
    // if (wellLegendUpdated) {
    //     setWellLegendUpdated(wellLegendUpdated)
    // } else {
    //     setWellLegendUpdated([0,0,0,0])
    // }

    const d3ColorName = d3ColorScales.find((value) => {
        return value.name == wellLegendUpdated 
    });

    const colorMapping = d3ColorName?.colors
    //const colorMapping = wellLegendUpdated

    const layerDataChanged = [{...args.wellLayers[0], logColor: wellLegendUpdated}]
    //const layerDataChanged = [{...args.wellLayers[0], colorMapping: colorMapping }]
    
    return <div>
            <div>
                <ColorLegend style={{ float: "right", position:"absolute", zIndex: 999, opacity: 1}} 
                    {...args}
                    getColorMapname={wellLayerData}
                />
            </div>
            <div>
                <DeckGLMap {...args} colorMapping={colorMapping} layers={layerDataChanged}
            />
            </div>
        </div>;
};

export const ColorSelectorForWellLayer = wellLayerTemplate.bind({});

ColorSelectorForWellLayer.args = {
    min,
    max,
    dataObjectName,
    position,
    horizontal,
    colorName,
    colorTables,
    discreteData,
    ...exampleData[0],
    id: wellId,
    wellLayers,
    legend: {
        visible: false,
    },
}; 
