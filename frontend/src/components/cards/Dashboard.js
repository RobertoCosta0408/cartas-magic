import React, { Fragment } from 'react';
import Form from './Form';
import Cards from './Cards';
import FormCollections from './FormCollections';

import Collections from './Collections';

export default function Dashboard() {
    return (
        <Fragment>
            <Collections />
            <Cards />
        </Fragment>
    )
}
