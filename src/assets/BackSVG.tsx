import React, { Fragment } from "react";
import { CenterItems } from "../pages/Profile/profile.styles";

interface BackSVGProps {}
export const BackSVG: React.FC<BackSVGProps> = () => {
  return (
    <Fragment>
      <CenterItems>
        <svg
          viewBox="0 0 24 24"
          className="r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
          fill="#fff"
          display="block"
        >
          <g>
            <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
          </g>
        </svg>
      </CenterItems>
    </Fragment>
  );
};
