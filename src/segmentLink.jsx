import React from "react";
import styles from "./mystyle.module.css";

const segmentUrl = "https://www.strava.com/segments/";

const SegmentLink = props => {
  const {
    segmentId,
    segmentName,
    realSegmentName,
    numAthletes,
    distance,
    averageGrade,
    clicked
  } = props;

  const distanceOneDec = Math.round((distance / 1000) * 10) / 10;
  const prettyDistance = distanceOneDec + "km";
  const prettyAverageGrade = averageGrade;
  const details = `${realSegmentName} - ${prettyDistance} ${prettyAverageGrade}% (${numAthletes})`;
  return (
    <a className={styles.header} href={segmentUrl + segmentId}>
      {clicked && details ? details : segmentName}
    </a>
  );
};

export default SegmentLink;
