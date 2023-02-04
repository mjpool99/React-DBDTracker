import React, { useState } from 'react'
import { useDB } from '../../contexts/DBContext'
import { useOutletContext } from 'react-router-dom';
import MatchKillerForm from './MatchKillerForm';
import KillerRecentMatch from './KillerRecentMatch';
import AllMatches from './AllMatches';
import TotalMatches from './TotalMatches';
import PlayedMost from './PlayedMost';

export default function KillerTracker() {
  const [user, setUser] = useOutletContext();
  const { killerResults } = useDB();
  const { killers, maps } = useDB();
  const [matchId, setMatchId] = useState("");
  const [killer, setKiller] = useState(() => {
    return killers;
  });
  const [map, setMap] = useState(() => {
    return maps;
  });

  return (
    <div  className='container'>
      <div className='d-flex justify-content-center flex-column'>
        <KillerRecentMatch recentMatch={killerResults[0]} />
        <div className='d-flex flex-row flex-wrap w-100 justify-content-between'>
                <TotalMatches totalMatches={killerResults.length} />
                <PlayedMost data={{data:killerResults, dataType: "killerPlayed"}} />
                <PlayedMost data={{data:killerResults, dataType: "map"}} />
                </div>
        <AllMatches allMatches={{func: killerResults, db: "killerMatches"}} />
      </div>

      <MatchKillerForm formData={{ killers: killers, maps: maps }} />
    </div>
  )
}
