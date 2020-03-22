import React, { Fragment } from 'react';
import Form from './Form';
import Cards from './Cards';
import FormCollections from './FormCollections';

export default function Dashboard() {
    return (
        <Fragment>
            <div>
            <Form />
            <FormCollections />
            </div>
            <Cards />
        </Fragment>
    )
}
