import React, { Component } from 'react';
import ExplorerElement from '../containers/explorerElement';
import '../assets/css/explorerContainer.css';
import { Grid, Row } from 'react-bootstrap';
import _ from 'lodash';


export default class explorerContainer extends Component {
    render() {

        const { folderContent } = this.props;

        let explorerElements = _.map(folderContent, (element, index) =>
            <ExplorerElement key={index} element={element} />
        );

        // Split the array to 4 elements per row
        const data = _.chunk(explorerElements, 4).map((expElementsArray, index) => <Row key={index}>{expElementsArray}</Row>);

        return (
            <Grid id="explorer_container">
                {data}
            </Grid>
        );
    }
}

