import React from "react";
import styles from "./mystyle.module.css";

export const createScoreEntry = (data,ind) => 
    data ? <ScoreEntry key={ind} {...data}/> : <EmptyScoreEntry key={ind}/>;

const EmptyScoreEntry = _ => {
    return <td>  </td>;
}

const secToMMSS = timeInSecStr => { 
    const secs = parseInt(timeInSecStr,10);
    const date = new Date(null);
    date.setSeconds( secs );
    return date.toISOString().substr(14, 5);
}
const ScoreEntry = props => {
    const {athlete_name, elapsed_time, start_date_local,rank} = props;
    const date = start_date_local.substr(0,10).split("-").reverse().join(".");
    const elapsedTimeInSeconds = secToMMSS(elapsed_time);
    const text = `${elapsedTimeInSeconds} (#${rank})`;

    const entryClasses = {
        1:styles.entry_first,
        2:styles.entry_second,
        3:styles.entry_third
    };
    const className = entryClasses[rank] || styles.entry_normal;

    return (
        <td className={className}> {text} </td>
    )
};

export default ScoreEntry;