import React, { Component } from 'react';
import Tabs from './Tabs';
import CompoundTable from './CompoundTable.js';

class App extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <Tabs>
          <div label="Compounds">
            <CompoundTable/>
          </div>
          <div label="Reactions">
            <h2>Reaction table will go here</h2>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
