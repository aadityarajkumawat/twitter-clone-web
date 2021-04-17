import React, { Fragment } from "react";
import * as S from "../../pages/home.styles";

interface TopLoaderProps {
  feedProgress: number;
}

export const TopLoader: React.FC<TopLoaderProps> = ({ feedProgress }) => {
  return (
    <Fragment>
      {feedProgress !== 100 && feedProgress !== 1 && (
        <S.ProgressBar>
          <S.Progress style={{ width: `${feedProgress}%` }}></S.Progress>
        </S.ProgressBar>
      )}
    </Fragment>
  );
};
