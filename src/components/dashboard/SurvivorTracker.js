import React, { useState } from 'react'
import { useDB } from '../../contexts/DBContext';
import { useOutletContext } from 'react-router-dom';
import MatchSurvivorForm from './MatchSurvivorForm';
import SurvivorRecentMatch from './SurvivorRecentMatch';
import AllMatches from './AllMatches';
import TotalMatches from './TotalMatches';
import PlayedMost from './PlayedMost';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function SurvivorTracker() {
    const [user, setUser] = useOutletContext();
    const { killers, maps, survivors, survivorResults } = useDB();
    const [matchId, setMatchId] = useState("");
    const [killer, setKiller] = useState(() => {
        return killers;
    });
    const [map, setMap] = useState(() => {
        return maps;
    });
    const [survivor, setSurvivor] = useState(() => {
        return survivors;
    });
    return (
        <div className='container'>
            <div className='d-flex justify-content-center flex-column'>
                <SurvivorRecentMatch recentMatch={survivorResults[0]} />
                <div className='d-flex flex-row flex-wrap w-100 justify-content-between'>
                <TotalMatches totalMatches={survivorResults.length} />
                <PlayedMost data={{data:survivorResults, dataType: "survivor"}} />
                <PlayedMost data={{data:survivorResults, dataType: "killerFaced"}} />
                <PlayedMost data={{data:survivorResults, dataType: "map"}} />
                </div>
                <AllMatches allMatches={{func: survivorResults, db: "survivorMatches"}} />
            </div>

            <MatchSurvivorForm formData={{ killers: killers, maps: maps, survivors: survivors }} />
        </div>
    )
}
