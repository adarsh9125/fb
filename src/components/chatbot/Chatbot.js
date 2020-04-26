
import React from 'react';
// import Headerform from '../../containers/hederform';
// import './Header.css';

class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
        // A UUID like '1d7e34d5-3952-4b86-90eb-7c7232b9b540' included in the embed code provided in Watson Assistant.
        integrationID: 'YOUR_INTEGRATION_ID',
        // Your assistants region e.g. 'us-south', 'us-east', 'jp-tok' 'au-syd', 'eu-gb', 'eu-de', etc
        region: 'YOUR_REGION'
      };
  }

  render () {

    return (
    <React.Fragment>
       <Headerform/>
    </React.Fragment>
  
   )
  }
}

export default Chatbot;