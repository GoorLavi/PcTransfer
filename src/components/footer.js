import React, {Component} from 'react';
import '../assets/css/footer.css';
import { Panel, Button } from 'react-bootstrap';

export default class footer extends Component {
    render() {

        const { onExitFolderClick } = this.props;

        return (
            <Panel id="footer" className="toolbar toolbar-footer">
               <Button id="folder_back_btn" bsStyle="success" onClick={() => onExitFolderClick()}>אחורה</Button>
            </Panel>
        );
    }
}

