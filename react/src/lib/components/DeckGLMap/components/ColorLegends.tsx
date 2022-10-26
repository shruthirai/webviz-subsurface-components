import React from "react";
import { ExtendedLayer } from "../layers/utils/layerTools";
import ColorLegend from "./ColorLegend";
import { colorTablesArray } from "@emerson-eps/color-tables/";

interface ColorLegendsProps {
    // Pass additional css style to the parent color legend container
    cssStyle?: Record<string, unknown> | null;
    horizontal?: boolean | null;
    layers: ExtendedLayer<unknown>[];
    colorTables: colorTablesArray | string | undefined;
    invertLegend?: boolean | undefined | null;
}

// Todo: Adapt it for other layers too
const ColorLegends: React.FC<ColorLegendsProps> = ({
    cssStyle,
    horizontal,
    layers,
    colorTables,
    invertLegend,
}: ColorLegendsProps) => {
    if (layers.length == 0) return null;
    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                zIndex: 999,
                ...cssStyle,
            }}
        >
            {layers.map((layer, index) => (
                <ColorLegend
                    layer={layer}
                    horizontal={horizontal}
                    key={index}
                    colorTables={colorTables}
                    invertLegend={invertLegend}
                />
            ))}
        </div>
    );
};

export default ColorLegends;
