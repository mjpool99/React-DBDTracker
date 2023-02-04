import React from 'react'

export default function KillerRecentMatch(props) {
    const recentMatch = props.recentMatch;
    return (
        <div>
            <div className="myCustomCard-table">
                <div className="d-flex w-100 justify-content-between">
                    <h1>Most Recent Match</h1>
                        <button type="button" className="myCustomCard-button" data-bs-toggle="modal" data-bs-target="#KillerForm">
                            Create New Killer
                        </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Map</th>
                            <th>Killer</th>
                            <th>Match Result</th>
                            <th>Number of Kills</th>
                            <th>Match Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentMatch &&
                            <tr>
                                <td>{recentMatch?.map}</td>
                                <td>{recentMatch?.killer}</td>
                                <td>{recentMatch?.matchResult}</td>
                                <td>{recentMatch?.numberOfKills}</td>
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
