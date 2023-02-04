import React, { useState, useRef } from 'react';
import { useDB } from '../../contexts/DBContext';
import { useOutletContext, Link } from 'react-router-dom';

export default function MatchSurvivorForm(props) {
  let killer = props.formData.killers;
  let map = props.formData.maps;
  let survivor = props.formData.survivors;
  const [user, setUser] = useOutletContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();
  const killerRef = useRef();
  const survivorRef = useRef();
  const matchResultRef = useRef();
  const { setSurvivorMatchResult } = useDB();


  const handleEvent = async (e, dbUser, map, killer, survivor, matchResult) => {
    setMessage("");
    e.preventDefault();
    dbUser = user.uid;
    map = mapRef.current.value;
    killer = killerRef.current.value;
    survivor = survivorRef.current.value;
    matchResult = matchResultRef.current.value;
    try {
      setLoading(true);
      await setSurvivorMatchResult(dbUser, map, killer, survivor, matchResult)
      setMessage("Survivor Match successfully uploaded!");
    } catch (error) {
      setMessage("Upload failed. Please try again later.")
    }
    mapRef.current.value = "";
    killerRef.current.value = "";
    survivorRef.current.value = "";
    matchResultRef.current.value = "";
    setLoading(false);
  }

  return (
    <div className="modal fade" id="SurvivorForm" tabIndex="-1" aria-labelledby="SurvivorForm" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="match-results">
            <div className='match-card'>
              <h1>Upload Survivor Match</h1>
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
                <label htmlFor="killer" className='text-light'>Killer Faced:</label>
                <select name='killer' ref={killerRef} className="form-select form-select-lg mb-3" required>
                  <option defaultChecked></option>
                  {Object.keys(killer).map((key, index) => {
                    return (
                      <option key={key} value={killer[index]}>{killer[index]}</option>
                    )
                  })}
                </select>
                <label htmlFor="survivor" className='text-light'>Survivor Played:</label>
                <select name='survivor' ref={survivorRef} className="form-select form-select-lg mb-3" required>
                  <option defaultChecked></option>
                  {Object.keys(survivor).map((key, index) => {
                    return (
                      <option key={key} value={survivor[index]}>{survivor[index]}</option>
                    )
                  })}
                </select>
                <label htmlFor="matchResult" className='text-light'>Match Result:</label>
                <select name='matchResult' ref={matchResultRef} className="form-select form-select-lg mb-3" required>
                  <option defaultChecked></option>
                  <option>Killer Disconnected</option>
                  <option>Dead</option>
                  <option>Sacrificed</option>
                  <option>Escaped</option>
                </select>
                <div className='d-flex w-100 justify-content-space-between align-items-center'>
                  <button disabled={loading} className="myCustomCard-button w-100">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
