import React, { Component } from 'react';
import SelectionZone from '../../containers/explorerContainer';
import Header from '../header';
import Footer from '../../containers/footer';

export default class cloningMode extends Component {
    render() {

        return (
            <div>
                <Header folderName={this.props.currentFolder} />
                <SelectionZone />
                <Footer />
            </div>

        );
    }
}

