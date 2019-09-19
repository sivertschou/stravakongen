import { useState, useEffect } from 'react';
import * as L from "partial.lenses";
import { useStoreActions } from 'easy-peasy';

const findNewestPr = segmentLeaderBoards => {
    const allDates = 
        L.collectAs(
            (d => new Date(d)),
            [L.values, L.children, "start_date_local"],
            segmentLeaderBoards
    );

    // const daties = 
    //     L.modify(
    //         [L.values, L.children, L.modifyOp(x => "start_date_local"],
    //         segmentLeaderBoards
    // );

    // console.log(daties);
    
    const minDate = 
        new Date(Math.min(...allDates));

    const maxDate = 
        new Date(Math.max(...allDates));

    return {minDate,maxDate};
};


const useMinMaxDate = segmentLeaderBoards => {

    const [minMaxDate,setminMaxDate] = useState(null);

    

    // useEffect( () => setminMaxDate(findNewestPr(segmentLeaderBoards)));

    useStoreActions(actions => actions.addMinMaxDate)(minMaxDate);

}


export default useMinMaxDate;