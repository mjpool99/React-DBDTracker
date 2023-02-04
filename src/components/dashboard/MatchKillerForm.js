import React, { useState, useRef } from 'react';
import { useDB } from '../../contexts/DBContext';
import { useOutletContext } from 'react-router-dom';


export default function MatchKillerForm(props) {
    let killer = props.formData.killers;
    let map = props.formData.maps;
    const [user, setUser] = useOutletContext();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const mapRef = useRef();
    const killerRef = useRef();
    const matchResultRef = useRef();
    const numberOfKillsRef = useRef();
    const { setKillerMatchResult } = useDB();

    const handleEvent = async (e, dbUser, map, killer, matchResult, numberOfKills) => {
        e.preventDefault();
        dbUser = user.uid;
        map = mapRef.current.value;
        killer = killerRef.current.value;
        matchResult = matchResultRef.current.value;
        numberOfKills = numberOfKillsRef.current.value;
        try {
            setLoading(true);
            setMessage("");
            await setKillerMatchResult(dbUser, map, killer, matchResult, numberOfKills)
            setMessage("Killer Match successfully uploaded!")
        } catch (error) {
            setMessage("Upload failed. Please try again later.")
        }
        mapRef.current.value = "";
        killerRef.current.value = "";
        matchResultRef.current.value = "";
        numberOfKillsRef.current.value = "";
        setLoading(false)
    }

    return (
        <div className="modal fade" id="KillerForm" tabIndex="-1" aria-labelledby="KillerForm" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="match-results">
                    <div className="match-results">
            <div className='match-card'>
                <h1>Upload Killer Match</h1>
                <form onSubmit={handleEvent}>
                    {message && <span className='message'>{message}</span>}
                    <label htmlFor="map" className='text-light'>Map Played:</label>
                    <select name='map' ref={mapRef} className="form-select form-select-lg mb-3" required>
                        <option defaultChecked></option>
                        {Object.keys(map).map((key, index) => {
                            return (
                                <option key={key} value={map[index]}>{map[index]}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="killer" className='text-light'>Killer Played:</label>
                    <select name='killer' ref={killerRef} className="form-select form-select-lg mb-3" required>
                        <option defaultChecked></option>
                        {Object.keys(killer).map((key, index) => {
                            return (
                                <option key={key} value={killer[index]}>{killer[index]}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="matchResult" className='text-light'>Match Result:</label>
                    <select name='matchResult' ref={matchResultRef} className="form-select form-select-lg mb-3" required>
                        <option defaultChecked></option>
                        <option>Disgraceful Defeat</option>
                        <option>The Entity Hungers...</option>
                        <option>Brutal Killer</option>
                        <option>Ruthless Killer</option>
                        <option>Merciless Killer</option>
                    </select>
                    <label htmlFor="numberOfKills" className='text-light'>Number of Kills:</label>
                    <input name='numberOfKills' type="number" ref={numberOfKillsRef} className="form-control mb-3" max={4} min={0} required/>
                    <div className='d-flex w-100 justify-content-space-between align-items-center'>
                        <button disabled={loading} className="myCustomCard-button w-100">Submit</button>
                    </div>
                </form>
            </div>
        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
