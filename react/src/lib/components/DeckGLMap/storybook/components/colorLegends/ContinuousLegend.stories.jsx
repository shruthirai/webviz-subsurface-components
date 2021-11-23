import React from "react";
import ContinuousLegend from "../../../components/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "DeckGLMap/Components/ColorLegends",
};
const template = require("../../../../../../demo/example-data/welllayer_template.json");
const colorTables = require("../../../../../../demo/example-data/color-tables.json");

const min = 0;
const max = 0.35;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const name = "PORO";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const ContinuousTemplate = Template.bind({});
ContinuousTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    template,
    colorTables,
};
