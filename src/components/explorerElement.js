import React, {Component} from 'react';
import Consts from '../consts';
import {Col, Thumbnail, Glyphicon} from 'react-bootstrap';
import DirectoryImage from '../assets/images/folder.jpg';
import FileImage from '../assets/images/file.png';

// Signal to each click
let doubleClick = [false, false];

export default class explorerElement extends Component {

    constructor(props) {
        super(props);

        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onClick = this.onClick.bind(this);
    }


     onClick() {
        setTimeout(() => {

            // If its the first or the second click
            // ignore the request
            if (!doubleClick[0] && !doubleClick[1]) {
            this.props.onClick(this.props);
            }
            else {
                doubleClick[0] ? doubleClick[0] = false :  doubleClick[1] = false;
            }
        },400);
    };


    onDoubleClick() {

        doubleClick = [true, true];

        this.props.onDoubleClick(this.props);
    };

    render() {

        const {folderPath, name, itemSelected, type} = this.props;

        let appearance;

        // If its an image show the current image
        // on the explorer element
        if (type === Consts.types.img)
            appearance = Consts.fsPath + folderPath + '/' + name;
        else
            appearance = getElementAppearanceByFileType(type);


        let footer = <p>{name}</p>;

        // Show selected icon
        if (itemSelected)
            footer = <Glyphicon glyph="ok"/>;



        return (
            <Col className="explorer-col" xs={3} onClick={()=> this.onClick()} onDoubleClick={()=> this.onDoubleClick()}>
                <Thumbnail className="image-thumbnail-element" src={appearance} alt="242x200">
                    {footer}
                </Thumbnail>
            </Col>
        );
    }
}

const getElementAppearanceByFileType = (type) => {

    switch (type) {
        case Consts.types.dir:

            return DirectoryImage;

        case Consts.types.file:
        default:
            return FileImage;
    }
};
