import React, {Component} from 'react';
import '../assets/css/footer.css';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';

export default class footer extends Component {
    render() {

        const { onExitFolderClick } = this.props;

        return (
            <Panel id="footer" className="toolbar toolbar-footer">
                <ButtonGroup id="footer_btns_group" >
                    <Button bsStyle="primary" className="footer-btn">העתק קבצים למכשיר</Button>
                    <Button bsStyle="primary" className="footer-btn">בחר את כל התיקייה</Button>
                    <Button bsStyle="primary" className="footer-btn" onClick={() => onExitFolderClick()}>חזור תיקייה</Button>
                </ButtonGroup>
            </Panel>
        );
    }
}
