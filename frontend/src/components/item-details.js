

import React from 'react'
import { useQuery } from '@apollo/client';
import { useParams, Link } from "react-router-dom"
import moment from "moment-mini";
import { BY_REF_QUERY } from '../graphql/queries'


function ItemDetails() {
    let { ref } = useParams();
    const { data, loading, error } = useQuery(BY_REF_QUERY,
        { variables: { ref }, });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>There was an error</div>;
    const { findByRef } = data
    return (
        <div className="container mx-auto mt-20 md:p-16">
            <h2 className="capitalize font-semibold mb-4 text-2xl">launch details page</h2>
            <h4 className="capitalize font-semibold mb-4 text-2xl">{findByRef.reference}</h4>
            <span className="bg-gray-200 p-1 mr-4 mb-4 rounded-sm  text-md ">{moment(findByRef.dueDate).format("MMM DD , YYYY")}</span>
            <ul className="mt-4 mb-8">

                {findByRef.tasks.map((task, index) => (
                    <li key={index}>
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" checked={task.status} onChange={() => { }}></input>
                            <span className="ml-2">{task.title}</span>
                        </label>
                    </li>
                ))}
            </ul>

            <Link className="bg-blue-600 text-white px-4 py-3 rounded-sm text-sm font-semibold" to="/">Back to Launch Schedule</Link>



        </div>
    )
}

export default ItemDetails
