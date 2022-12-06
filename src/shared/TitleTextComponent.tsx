import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    emptyWrapper: {
      minHeight: theme.typography.body1.lineHeight,
      background: grey[200],
    },
  });

interface Props {
  title: string;
  text: string;
  classes: {
    emptyWrapper: string;
  };
}

const TitleTextComponent: React.FC<Props> = ({ title, text, classes }) => {
  return (
    <>
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
      {text ? (
        <Typography gutterBottom>{text}</Typography>
      ) : (
        <div className={`${classes.emptyWrapper} emptyWrapper`} />
      )}
    </>
  );
};

export default withStyles(styles)(TitleTextComponent);
