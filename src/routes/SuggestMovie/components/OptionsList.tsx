import React from "react";
import Chip from "@material-ui/core/Chip";
import { Option } from "./SuggestMovie";
import { makeStyles } from "@material-ui/core/styles";
import { FormikContextType, useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export type fieldNames = "genres" | "cast" | "popularPeople";

export type Props = {
  options: Array<Option>;
  fieldName: fieldNames;
};

export type Values = Record<fieldNames, Array<Option>>;

const OptionsList = ({ options, fieldName }: Props) => {
  const classes = useStyles();

  const { values, setFieldValue }: FormikContextType<Values> =
    useFormikContext();

  return (
    <div className={classes.root}>
      {options.map((item) => {
        return (
          <Chip
            label={item.label}
            key={item.value}
            onClick={() => {
              const isExist = values[fieldName].find(
                (i: Option) => i.value === item.value
              );
              if (isExist) {
                setFieldValue(
                  fieldName,
                  values[fieldName].filter(
                    (i: Option) => i.value !== item.value
                  )
                );
              } else {
                setFieldValue(fieldName, [...values[fieldName], item]);
              }
            }}
            color={
              values[fieldName].find((i: Option) => i.value === item.value)
                ? "primary"
                : "default"
            }
          />
        );
      })}
    </div>
  );
};

export default OptionsList;
