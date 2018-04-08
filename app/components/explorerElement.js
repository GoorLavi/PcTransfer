import React, {Component} from 'react';
import Consts from '../consts';
import {Col, Thumbnail, Glyphicon} from 'react-bootstrap';
import DirectoryImage from '../assets/images/folder.jpg';
import FileImage from '../assets/images/file0.png';
import {convertSlashesToBackSlashes, combinePath} from '../utiles/filesUtils';

// Signal to each click
let doubleClick = [false, false];

export default class explorerElement extends Component {

  constructor(props) {
    super(props);

    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getElementAppearanceByFileType = this.getElementAppearanceByFileType.bind(this);
  }

  onClick() {
    setTimeout(() => {

      // If its the first or the second click
      // ignore the request
      if (!doubleClick[0] && !doubleClick[1]) {
        this.props.onClick();
      } else {
        doubleClick[0]
          ? doubleClick[0] = false
          : doubleClick[1] = false;
      }
    }, 400);
  };

  getElementAppearanceByFileType() {

    let {folderPath, name, type} = this.props.element;

    switch (type) {
      case Consts.types.dir:

        return DirectoryImage;
      case Consts.types.img:

        folderPath = convertSlashesToBackSlashes(folderPath);
        const sharedFolderPath = convertSlashesToBackSlashes(Consts.sharedFolderPath);

        return combinePath(Consts.fsPath, sharedFolderPath, folderPath, name);

      case Consts.types.file:
      default:
        return FileImage;
    }
  };

  onDoubleClick() {

    doubleClick = [true, true];

    this.props.onDoubleClick();
  };

  render() {

    const {name, itemSelected, type} = this.props.element;

    const appearance = this.getElementAppearanceByFileType(type);

    const nameJsx = <p className="element-name">{name}</p>;

    // Show selected icon next to the element name
    const footer = itemSelected
      ? <div>{nameJsx}<Glyphicon className="element-checked-icon" glyph="ok"/></div>
      : nameJsx;

    return (<Col className="explorer-col" xs={3} onClick={() => this.onClick()} onDoubleClick={() => this.onDoubleClick()}>
      <Thumbnail className="image-thumbnail-element" src={appearance} alt="242x200">
        {footer}
      </Thumbnail>
    </Col>);
  }
}
