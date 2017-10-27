import React, { Component } from 'react';
import ExplorerElement from '../containers/explorerElement';
import '../assets/css/explorerContainer.css';
import { Grid, Row } from 'react-bootstrap';
import _ from 'lodash';


export default class explorerContainer extends Component {
    render() {

        const { folderContent } = this.props;

        let explorerElements = folderContent.map((element, index) =>
            <ExplorerElement key={index} type={element.type} name={element.name} folderPath={element.folderPath} />
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

