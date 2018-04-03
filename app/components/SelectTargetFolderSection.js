import React from 'react';
import _ from 'lodash';

class selectTargetFolder extends React.Component {

  render() {

    const drivesList = _.map(this.props.drivesList, (val, key) => {
      return (<div>{val}</div>)
    });

    return (<div>
      {drivesList}
    </ div>);
  }
}

export default selectTargetFolder;
