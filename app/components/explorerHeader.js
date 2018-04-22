import React, { Component } from 'react';
import { Breadcrumb, Glyphicon, Button } from 'react-bootstrap';
import _ from 'lodash';
import consts from '../consts';

export default class explorerHeader extends Component {

    constructor(props){
        super(props);

        this.getBreadcrumbs = this.getBreadcrumbs.bind(this);
    }

    getBreadcrumbs(folderPath) {

        let folderArray = [consts.mainFolderDisplayName];

        if(folderPath)
            folderArray = folderArray.concat(folderPath.split('/'));

        return _.map(folderArray, (folderName, index) => {

            return <Breadcrumb.Item onClick={() => this.props.onGoBackToFolder(folderName)} 
            active={folderArray.length === index+1} key={index} >{_.capitalize(folderName)}</Breadcrumb.Item>;
        });
    }

    render() {

        const { folderPath, onChangeSectionClick, disableSectionBtn } = this.props;

        let breadcrumbs = this.getBreadcrumbs(folderPath);

        return (
                <div id="explorer_header"> 
                        <Breadcrumb id="breadcrumb">
                            <Button className="navigation-buttons">
                                <Glyphicon onClick ={() => this.props.goBack()}
                                    className="navigation-icons" glyph="menu-left" />
                            </Button>   
                            {breadcrumbs}
                        </Breadcrumb>
                        <Button onClick={() => onChangeSectionClick()} id="selection_done_btn" disabled={disableSectionBtn} >Copy Files</Button>
                </div>
        );
    }
}
