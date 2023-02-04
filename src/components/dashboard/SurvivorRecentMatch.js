import React from 'react'

export default function SurvivorRecentMatch(props) {
    const recentMatch = props.recentMatch;
    return (
        <div>
            <div className="myCustomCard-table">
                <div className="d-flex w-100 justify-content-between">
                    <h1>Most Recent Match</h1>
                        <button type="button" className="myCustomCard-button" data-bs-toggle="modal" data-bs-target="#SurvivorForm">
                            Create New Survivor
                        </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Map</th>
                            <th>Killer</th>
                            <th>Survivor</th>
                            <th>Match Result</th>
                            <th>Match Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentMatch &&
                            <tr>
                                <td>{recentMatch?.map}</td>
                                <td>{recentMatch?.killer}</td>
                                <td>{recentMatch?.survivor}</td>
                                <td>{recentMatch?.matchResult}</td>
                                <td>{new Date(recentMatch?.createdAt).toLocaleString()}</td>
                            </tr>
                        }
                        {!recentMatch &&
                            <tr>
                                <td colSpan={5}>
                                    No recent matches to display.
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
