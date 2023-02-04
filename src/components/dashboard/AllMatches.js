import React, { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function AllMatches(props) {
    const allMatches = props.allMatches.func;
    const db = props.allMatches.db;
    const [matchId, setMatchId] = useState("");
    return (
        <div>
            <div className="myCustomCard-table">
                <div className="d-flex w-100 justify-content-start">
                    <h1>All Matches</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Map</th>
                            <th>Killer</th>
                            {allMatches[0]?.survivor &&
                                <th>Survivor</th>
                            }
                            <th>Match Result</th>
                            {allMatches[0]?.numberOfKills &&
                                <th>Number of Kills</th>
                            }
                            <th>Match Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allMatches.length > 0 &&
                            Object.keys(allMatches).map((key, index) => {
                                return (
                                    <tr key={key}>
                                        <td><div className='delete'><button onClick={() => { setMatchId(allMatches[index]?.id) }} id={allMatches[index]?.id} data-bs-toggle="modal" data-bs-target="#DeleteForm"><i className="bi bi-trash-fill"></i></button></div></td>
                                        <td>{allMatches[index]?.map}</td>
                                        <td>{allMatches[index]?.killer}</td>
                                        {allMatches[index]?.survivor &&
                                            <td>{allMatches[index]?.survivor}</td>
                                        }
                                        <td>{allMatches[index]?.matchResult}</td>
                                        {allMatches[index]?.numberOfKills &&
                                            <td>{allMatches[index]?.numberOfKills}</td>
                                        }
                                        <td>{new Date(allMatches[index]?.createdAt).toLocaleString()}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            allMatches.length < 0 &&
                            <tr>
                                <td colSpan={6}>No matches to display.</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <DeleteConfirmModal info={{ db: db, id: matchId }} />
        </div>
    )
}
