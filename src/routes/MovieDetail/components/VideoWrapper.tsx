import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import YouTube from "react-youtube";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";
import { VideoItem } from "../reducers/movieDetail";

const styles = (theme: Theme) =>
  createStyles({
    panelWrapper: {
      marginBottom: theme.spacing.unit,
    },
    videoWrapper: {
      flexWrap: "wrap",
    },
    videoInner: {
      height: 0,
      paddingTop: "56%",
      position: "relative",
      width: "100%",
      marginBottom: theme.spacing.unit,
    },
    youTubeWrapper: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "150%",
      background: "#949494",
    },
  });

interface Props {
  data: Array<VideoItem>;
  classes: {
    panelWrapper: string;
    videoWrapper: string;
    videoInner: string;
    youTubeWrapper: string;
    media: string;
  };
  handleVideo: () => void;
  openVideo: boolean;
  showVideoClicked: boolean;
}

const VideoWrapper: React.FC<Props> = ({
  data,
  classes,
  handleVideo,
  openVideo,
  showVideoClicked,
}: Props) => {
  return (
    <ExpansionPanel expanded={openVideo} className={classes?.panelWrapper}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={handleVideo}
      >
        <Typography>{openVideo ? "Hide video" : "Show video"}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes?.videoWrapper}>
        {data.map((item) => {
          return (
            <React.Fragment key={item.key}>
              {(openVideo || showVideoClicked) && (
                <div className={classes?.videoInner}>
                  <YouTube
                    className={classes?.youTubeWrapper}
                    videoId={item.key}
                    opts={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(VideoWrapper);
