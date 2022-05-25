import React from "react";
import { Layer } from "deck.gl";
import {
    DiscreteColorLegend,
    ContinuousLegend,
} from "@emerson-eps/color-tables";
import { colorTablesArray } from "@emerson-eps/color-tables/";

interface ColorLegendProps {
    position?: number[] | null;
    horizontal?: boolean | null;
    layers: Layer<unknown>[];
    colorTables: colorTablesArray;
}

// Todo: Adapt it for other layers too
const ColorLegend: React.FC<ColorLegendProps> = ({
    position,
    horizontal,
    layers,
}: ColorLegendProps) => {
    const [legendProps, setLegendProps] = React.useState<
        [
            {
                title: string;
                colorName: string;
                discrete: boolean;
                metadata: { objects: Record<string, [number[], number]> };
                valueRange: number[];
                visible: boolean;
            }
        ]
    >([
        {
            title: "",
            colorName: "string",
            discrete: false,
            metadata: { objects: {} },
            valueRange: [],
            visible: true,
        },
    ]);

    // Get color table for log curves.
    React.useEffect(() => {
        if (!layers) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getLegendData: any = [];
        layers.map((layer) => {
            if (layer?.state?.legend) {
                getLegendData.push({
                    title: layer?.state?.legend[0]?.title,
                    colorName: layer?.state?.legend[0]?.colorName,
                    discrete: layer?.state?.legend[0]?.discrete,
                    metadata: layer?.state?.legend[0]?.metadata,
                    valueRange: layer?.state?.legend[0]?.valueRange,
                    visible: layer?.props?.visible,
                });
            }
        });
        setLegendProps(getLegendData);
    }, [layers]);

    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                right: position ? position[0] : " ",
                top: position ? position[1] : " ",
                zIndex: 999,
            }}
        >
            {legendProps.map(
                (legend, index) =>
                    legend.visible && (
                        <div key={index}>
                            {legend.discrete && (
                                <DiscreteColorLegend
                                    discreteData={legend.metadata}
                                    dataObjectName={legend.title}
                                    colorName={legend.colorName}
                                    position={position}
                                    horizontal={horizontal}
                                />
                            )}
                            {legend.valueRange?.length > 0 && legend && (
                                <ContinuousLegend
                                    min={legend.valueRange[0]}
                                    max={legend.valueRange[1]}
                                    dataObjectName={legend.title}
                                    colorName={legend.colorName}
                                    position={position}
                                    horizontal={horizontal}
                                    uniqueId={index}
                                />
                            )}
                        </div>
                    )
            )}
        </div>
    );
};

ColorLegend.defaultProps = {
    position: [5, 10],
    horizontal: false,
};

export default ColorLegend;
