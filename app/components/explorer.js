import React, { Component } from 'react';
import ExplorerElement from '../containers/explorerElement';
import { Grid, Row, Breadcrumb, Glyphicon, Button } from 'react-bootstrap';
import _ from 'lodash';
import Sidebar from '../containers/sidebar';
import { PropagateLoader } from 'react-spinners';
import consts from '../consts';
import ExplorerHeader from '../containers/explorerHeader';

export default class Explorer extends Component {

    constructor(props){
        super(props);

    }

    render() {

        const { folderContent, loadingFolderContent } = this.props;

        let explorerElements = _.map(folderContent, (element, index) =>
            <ExplorerElement key={index} element={element} />
        );

        return (
            <div id="explorer_wrapper">
                <div id="explorer_container_and_header">
                    <ExplorerHeader />
                    <Grid id="explorer_container">
                    {loadingFolderContent ? <PropagateLoader color={'#337ab7'} loading={true} /> : explorerElements}
                    </Grid>
                </div>
                <Sidebar />
            </div>
        );
    }
}
