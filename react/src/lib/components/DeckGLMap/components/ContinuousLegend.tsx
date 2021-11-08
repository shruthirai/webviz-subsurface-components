import { RGBToHex } from "../utils/continuousLegend";
import React from "react";
import { select, scaleLinear, scaleSequential, axisBottom } from "d3";

interface legendProps {
    min: number;
    max: number;
    dataObjectName: string;
    position: number[];
    colorTable: [number, number, number, number][];
}

interface ItemColor {
    color: string;
    offset: number;
}

const ContinuousLegend: React.FC<legendProps> = ({
    min,
    max,
    dataObjectName,
    position,
    colorTable,
}: legendProps) => {
    React.useEffect(() => {
        continuousLegend("#legend");
    }, [min, max]);

    function continuousLegend(selected_id: string) {
        const itemColor: ItemColor[] = [];
        colorTable.forEach((value: [number, number, number, number]) => {
            itemColor.push({
                offset: RGBToHex(value).offset,
                color: RGBToHex(value).color,
            });
        });

        select(selected_id).select("svg").remove();
        const colorScale = scaleSequential().domain([min, max]);
        // append a defs (for definition) element to your SVG
        const svgLegend = select(selected_id).append("svg").attr("width", 300);
        const defs = svgLegend.append("defs");
        // append a linearGradient element to the defs and give it a unique id
        const linearGradient = defs
            .append("linearGradient")
            .attr("id", "linear-gradient");
        // append multiple color stops by using D3's data/enter step
        linearGradient
            .selectAll("stop")
            .data(itemColor)
            .enter()
            .append("stop")
            .attr("offset", function (data) {
                return data.offset;
            })
            .attr("stop-color", function (data) {
                return data.color;
            });

        // append title
        svgLegend
            .append("text")
            .attr("class", "legendTitle")
            .attr("x", 0)
            .attr("y", 20)
            .style("text-anchor", "left")
            .text(dataObjectName);

        // draw the rectangle and fill with gradient
        svgLegend
            .append("rect")
            .attr("x", 10)
            .attr("y", 30)
            .attr("width", 250)
            .attr("height", 25)
            .style("fill", "url(#linear-gradient)");

        //create tick marks
        const xLeg = scaleLinear().domain([min, max]).range([10, 258]);

        const axisLeg = axisBottom(xLeg).tickValues(colorScale.domain());

        svgLegend
            .attr("class", "axis")
            .append("g")
            .attr("transform", "translate(0, 55)")
            .style("font-size", "10px")
            .style("font-weight", "700")

            .call(axisLeg)
            .style("stroke", "none !important");
    }

    return (
        <div
            style={{
                position: "absolute",
                right: position[0],
                top: position[1],
            }}
        >
            <div id="legend" style={{ marginRight: "-10px" }}></div>
        </div>
    );
};

ContinuousLegend.defaultProps = {
    position: [16, 10],
};

export default ContinuousLegend;
