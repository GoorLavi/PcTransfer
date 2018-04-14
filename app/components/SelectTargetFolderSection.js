import React from 'react';
import _ from 'lodash';
import DeviceElement from '../containers/deviceElement';

class selectTargetFolder extends React.Component {

  render() {

    const drivesList = _.map(this.props.usbDevices, (val, key) => {

      const path = val.getPath();
      return (<DeviceElement key={path} path={path}></DeviceElement>)
    });

    return (<div>
      {drivesList}
    </ div>);
  }
}

export default selectTargetFolder;
