import React, {Component} from 'react';
import '../assets/css/footer.css';
import { Panel, Button, ButtonGroup } from 'react-bootstrap';
import Consts from '../consts';

export default class footer extends Component {
    render() {

        const { onExitFolderClick, onChangeSectionClick, chosenSection, disableSectionBtn } = this.props;

        const changeSectionText = chosenSection === Consts.section.fileSection ? 'העתק קבצים למכשיר' : 'חזור לבחירת קבצים';

        return (
            <Panel id="footer" className="toolbar toolbar-footer">
                <ButtonGroup id="footer_btns_group" >
                    <Button bsStyle="primary" className="footer-btn" disabled={disableSectionBtn} onClick={() => onChangeSectionClick()}>{changeSectionText}</Button>
                    <Button bsStyle="primary" className="footer-btn">בחר את כל התיקייה</Button>
                    <Button bsStyle="primary" className="footer-btn" onClick={() => onExitFolderClick()}>חזור תיקייה</Button>
                </ButtonGroup>
            </Panel>
        );
    }
}
