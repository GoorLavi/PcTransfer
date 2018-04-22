import React, { Component } from 'react';
import Explorer from '../../containers/explorer';
import SelectTargetFolderSection from '../../containers/SelectTargetFolderSection';
import Consts from '../../consts';


export default class cloningMode extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {

        if(this.props.cloneModeInitialized)
            this.props.initializeState();
    }

    render() {

        const { selectSection } = this.props;

        return (
            <div className="wrapper">
                {selectSection === Consts.section.fileSection ? 
                <Explorer /> :
                 <SelectTargetFolderSection />}
            </div>
        );
    }
}

