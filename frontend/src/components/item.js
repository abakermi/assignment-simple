import React from 'react'
import {
    Link
} from "react-router-dom";
import moment from "moment-mini"



const CheckListItem = ({ data: { dueDate, reference, isLaunch, isWorkingDay }, link }) => {

    return (

        <tr>
            <td className={`border-separate border-b border-gray-400 p-1 ${!isWorkingDay ? 'bg-gray-400' : ''} `}>
                {(!isLaunch && isWorkingDay) &&
                    <span className="font-bold uppercase text-gray-900 mr-4 text-md">{reference}</span>
                }

                <span className={`text-gray-900  ${isLaunch ? 'font-semibold' : isWorkingDay ? 'bg-gray-200' : ''} p-1 mr-4 rounded-sm  text-md `}>{moment(dueDate).format(isLaunch ? "DD MMMM YYYY" : "MMM DD , YYYY")}
                    {isLaunch ? '  (Launch day)' : ''}
                </span>
                {isWorkingDay &&
                    <Link className="bg-blue-200 text-blue-800 py-1/3 px-1 rounded-sm text-sm font-semibold" to={link}>view details</Link>
                }


            </td>

        </tr>
    )
}

export default CheckListItem
