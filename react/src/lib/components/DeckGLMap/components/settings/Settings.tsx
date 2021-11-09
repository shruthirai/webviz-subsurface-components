import { Icon } from "@equinor/eds-core-react";
import { layers } from "@equinor/eds-icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { MapState } from "../../redux/store";
import LayersButton from "./LayersButton";
import LayerSettingsButton from "./LayerSettingsButton";

Icon.add({ layers }); // (this needs only be done once)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
        },
    })
);
const Settings: React.FC = React.memo(() => {
    const classes = useStyles();

    const layers = useSelector((st: MapState) => st.layers);

    if (!layers.length) return null;
    return (
        <div className={classes.root}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(layers as any[]).map((layer) => (
                <LayerSettingsButton
                    layerId={layer.id}
                    layerType={layer["@@type"]}
                    name={layer.name}
                    key={`settings-button-${layer.id}`}
                />
            ))}
            <LayersButton />
        </div>
    );
});

Settings.displayName = "Settings";
export default Settings;
