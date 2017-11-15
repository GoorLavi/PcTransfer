import React, { Component } from 'react';
import SelectFilesSection from '../../containers/explorerContainer';
import SelectTargetFolderSection from '../../containers/SelectTargetFolderSection';
import Header from '../header';
import Consts from '../../consts';
import Footer from '../../containers/footer';



export default class cloningMode extends Component {
    render() {

        const { selectSection } = this.props;

        return (
            <div>
                <Header folderName={this.props.currentFolder} />

                {selectSection === Consts.section.fileSection ? <SelectFilesSection /> : <SelectTargetFolderSection  />}
                <Footer />
            </div>
        );
    }
}

