import React, { Fragment } from "react";
import { Plac } from "../../pages/home.styles";

interface TriggerProps {
  ref: any;
}

export const Trigger: React.FC<TriggerProps> = ({ ref }) => {
  return (
    <Fragment>
      <Plac ref={ref}></Plac>
    </Fragment>
  );
};
