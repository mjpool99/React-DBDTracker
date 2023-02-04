import React from 'react'

export default function TotalMatches(props) {
    const totalMatches = props.totalMatches
    return (
        <div>
                <table  className='myCustomCard-total'>
                    <thead>

                        <tr>
                            <th className='text-center single-title'>
                                Matches Played
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="single-record text-center">
                                {totalMatches}
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    )
}
