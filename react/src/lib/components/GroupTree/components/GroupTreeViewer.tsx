import { createStyles, makeStyles } from "@material-ui/core";
import { cloneDeep } from "lodash";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { GroupTreeState } from "../redux/store";
import { DataContext } from "./DataLoader";
import "./Plot/dynamic_tree.css";
import GroupTree from "./Plot/group_tree";
import SettingsBar from "./Settings/SettingsBar";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "90%",
        },
    })
);

interface Props {
    id: string;
}

const GroupTreeViewer: React.FC<Props> = ({ id }: Props) => {
    const classes = useStyles();
    const divRef = useRef<HTMLDivElement>(null);
    const data = useContext(DataContext);

    const renderer = useRef<GroupTree>();

    const currentDateTime = useSelector(
        (state: GroupTreeState) => state.ui.currentDateTime
    );
    const currentFlowRate = useSelector(
        (state: GroupTreeState) => state.ui.currentFlowRate
    );
    useEffect(() => {
        // Clear possible elements added from earlier updates.
        const node = document.getElementById(id);
        if (node) {
            node.innerHTML = "";
        }

        renderer.current = new GroupTree(
            id,
            cloneDeep(data),
            "oilrate",
            currentDateTime
        );
    }, [data]);

    useEffect(() => {
        if (!renderer.current) return;

        renderer.current.update(currentDateTime);
    }, [currentDateTime]);

    useEffect(() => {
        if (!renderer.current) return;
        renderer.current.flowrate = currentFlowRate;
    }, [currentFlowRate]);

    return (
        <div className={classes.root}>
            <SettingsBar />
            <div id={id} ref={divRef} />
            {/* <GroupTreePlot root={root} currentFlowRate={currentFlowRate} /> */}
        </div>
    );
};

GroupTreeViewer.displayName = "GroupTreeViewer";
export default GroupTreeViewer;
