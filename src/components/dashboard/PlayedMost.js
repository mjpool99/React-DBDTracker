import React from 'react'

export default function PlayedMost(props) {
  const data = props.data.data;
  const dataT = props.data.dataType;
  let newArray = [];
  let mostPlayed;

  Object.keys(data).map((key, index) => {
    switch (dataT) {
      case "survivor":
        return newArray.push(data[index].survivor)
        break;
      case "map":
        return newArray.push(data[index]?.map)
        break;
      case "killerFaced":
        return newArray.push(data[index]?.killer)
        break;
      case "killerPlayed":
        return newArray.push(data[index]?.killer)
        break;
    }
  })
  const count = {};
  let mostCommon = [];
  newArray.forEach(el => {
    count[el] = (count[el] || 0) + 1;
  });
  mostCommon = Object.keys(count).reduce((acc, val, ind) => {
    if (!ind || count[val] > count[acc[0]]) {
      return [val];
    };
    if (count[val] === count[acc[0]]) {
      acc.push(val);
    };
    return acc;
  }, []);
  mostPlayed = mostCommon;
  return (
    <div>
      <table className='myCustomCard-total'>
        <thead>
          <tr>
            {dataT === "survivor" &&
              <th className='text-center single-title'>
                Survivor Most Played
              </th>
            }
            {dataT === "map" &&
              <th className='text-center single-title'>
                Map Most Played
              </th>
            }
            {dataT === "killerFaced" &&
              <th className='text-center single-title'>
                Killer Most Faced
              </th>
            }
            {dataT === "killerPlayed" &&
              <th className='text-center single-title'>
                Killer Most Played
              </th>
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="single-record-name text-center">
              {mostPlayed.join(", ")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
