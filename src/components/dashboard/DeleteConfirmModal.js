import React, { useState, useRef } from 'react';
import { useDB } from '../../contexts/DBContext';
import { useOutletContext } from 'react-router-dom';
import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';


export default function MatchKillerForm(props) {
    const { deleteSurvivorMatchResult, deleteKillerMatchResult } = useDB();
    let dbInfo = props.info;

    const handleEvent = async () => {
           return await deleteDoc(doc(db, props.info.db, props.info.id))
    }

    return (
        <div className="modal fade" id="DeleteForm" tabIndex="-1" aria-labelledby="DeleteForm" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="match-card">
                    <h1>Are you sure?</h1>
                    <div className='d-flex w-100' style={{flexDirection: "row-reverse", margin: "30px 10px 0 10px"}}>
                    <button className='myCustomCard-button red w-100 ms-1' data-bs-dismiss="modal" onClick={handleEvent}>Delete</button>
                    <button className='myCustomCard-button w-100 ms-1' data-bs-dismiss="modal">No</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}