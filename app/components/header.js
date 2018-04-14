import React, {Component} from 'react';
import { Panel } from 'react-bootstrap';
import '../assets/css/header.css';


export default class header extends Component {
    render() {

        return (
            <Panel id="header">
                <p id="title">פתח הדביר</p>
            </Panel>
        );
    }
}

