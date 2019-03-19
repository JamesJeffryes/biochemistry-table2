import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';

function imgFormater(cell, row) {
    return (
        <object data={`http://minedatabase.mcs.anl.gov/compound_images/ModelSEED/${cell}.png`}
             type="image/png" aria-label={`Image for ${cell}`} style={{height: '100px'}}/>
    );
  }

function aliasFormater(cell, row) {
    return (
        <span>{String(cell).replace(/\|/g, ', ').replace(/;/g, '\n')}</span>
    );
  }

const NoDataIndication = () => (
    <div className="text-center">
        <h1>Loading...</h1>
    </div>
);

const expandRow = {
  renderer: row => {
      return (
      <div className="row">
        <div className="col-sm">
          <object data={`http://minedatabase.mcs.anl.gov/compound_images/ModelSEED/${row.id}.png`}
               type="image/png" aria-label={`Image for ${row.id}`} style={{height: '300px'}}/>
        </div>
        <div className="col-sm">
          <ul style={{'list-style-type': 'none'}}>
              <li><strong>Abbreviation:</strong> {row.abbreviation}</li>
              <li><strong>DeltaG:</strong> {row.deltag}</li>
              <li><strong>DeltaG Error:</strong> {row.deltagerr}</li>
              <li><strong>pKa:</strong> {row.pka}</li>
              <li><strong>pKb:</strong> {row.pkb}</li>
              <li><strong>InChIKey:</strong> {row.inchikey}</li>
              <li><strong>SMILES:</strong> {row.smiles}</li>
              <li><strong>Is Core:</strong> {row.is_core}</li>
              <li><strong>Is Cofactor:</strong> {row.is_cofactor}</li>
              <li><strong>Is Obsolete:</strong> {row.is_obsolete}</li>
              <li><strong>Source:</strong> {row.source}</li>
          </ul>
        </div>
      </div>
  )},
  showExpandColumn: true,
  onlyOneExpanding: true
};

class CompoundTable extends Component {
  state = {
    table_items: [],
    columns: [{
      dataField: 'id',
      text: 'ID',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'id',
      text: 'Image',
      formatter: imgFormater
    }, {
      dataField: 'name',
      text: 'Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'formula',
      text: 'Formula',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'mass',
      text: 'Mass',
      sort: true,
      filter: numberFilter()
    }, {
      dataField: 'charge',
      text: 'Charge',
      sort: true,
      filter: numberFilter()
    }, {
      dataField: 'aliases',
      text: 'Aliases',
      formatter: aliasFormater,
      filter: textFilter()
    }]
  };

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/ModelSEED/ModelSEEDDatabase/dev/Biochemistry/compounds.json')
      .then(response => {
        this.setState({
          table_items: response.data
        });
      });
  }

  render() {
    return (
        <BootstrapTable
        keyField='id'
        headerClasses='table-header'
        data={ this.state.table_items }
        columns={ this.state.columns }
        pagination={ paginationFactory() }
        expandRow={ expandRow }
        filter={ filterFactory() }
        noDataIndication={ () => <NoDataIndication/> }
        />
    );
  }
}

export default CompoundTable;
