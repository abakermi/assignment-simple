

import React from 'react'
import { useQuery } from '@apollo/client';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import { GET_QUERY } from '../graphql/queries'
import CheckListItem from './item'
import ItemDetails from './item-details'


function ListContainer() {
    let { path, url } = useRouteMatch();

    const { data, loading, error } = useQuery(GET_QUERY);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>There was an error</div>;

    return (
        <div className="container mx-auto mt-20 md:p-16">
            <h2 className="capitalize font-bold text-2xl mb-4">launch schedule</h2>
            <div className="wrapper flex" >
                <table className="border-separate border border-gray-400 flex-1">
                    <thead>

                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.checklists.map((e, index) => (
                            <CheckListItem data={e} link={`${url}${e.reference}`} key={index} />
                        ))}


                    </tbody>
                </table>
            </div>
            {/* <Route exact path={path}>
                <h3>Please select a topic.</h3>
            </Route> */}
            <Switch>
                <Route path={`${path}/:ref`}>
                    <ItemDetails />
                </Route>
            </Switch>
        </div>
    )
}

export default ListContainer
