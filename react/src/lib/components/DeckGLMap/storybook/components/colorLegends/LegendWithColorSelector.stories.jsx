import React from "react";
import { ContinuousLegend } from "../../../components/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "DeckGLMap/Components/ColorLegends/LegendWithColorSelector",
};
import colorTables from "@emerson-eps/color-tables/src/component/color-tables.json";

const min = 0;
const max = 0.35;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const name = "PORO";
const horizontal = true;
const colorName = "Rainbow";
const parentdata= "true";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const LegendTemplate = Template.bind({});
LegendTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    colorName,
    colorTables,
    horizontal,
    parentdata,
};