import React from "react";
import { useStoreState } from "easy-peasy";
import Table from 'react-bootstrap/Table';
import {createScoreEntry} from "./ScoreEntry";
import { allSegments } from "./data/segments";
import getRanking from "./ranking";

const Scoreboard = props => {
    const {segments, dateRange} = props;

    const state = useStoreState( state => state);
;
    const allTime = state.athleteEfforts[dateRange];
    const leaderboardsAllTime = state.segmentLeaderboards[dateRange];
    

    const segmentUrl = "https://www.strava.com/segments/";
    
    const createSegmentLink = seg => (
        <th key={seg.id}> 
            <a href={segmentUrl + seg.id} > 
                {allSegments[seg.id].name} 
            </a> 
        </th>
    );
        

    const segmentRow = segments.map(createSegmentLink);
    
    const ranking = getRanking(allTime, segments,leaderboardsAllTime);
    

    const createRow = ({athleteName,ranks},athleteRecord,ind) => (
        <tr key={athleteName}> 
            <td> 
                {athleteName}
            </td>
            <td>
               {`${ind+1} (${ranks})`}
            </td>
            {Array.from(segments).map( (seg,ind) => 
                createScoreEntry(athleteRecord[seg.id],ind))}
        </tr>
    );
    
    const dataRows = ranking.map((o,ind) => createRow(o, allTime[o.athleteName],ind));
    

    return (
        <>  
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>#</th>
                        {segmentRow}                    
                
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </Table>
        </>
    );
} 

export default Scoreboard;