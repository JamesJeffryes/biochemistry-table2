import React, { Component } from 'react';
import BiochemistryTable from "./BiochemistryTable";


class ReactionTable extends Component {
    aliasFormater = (cell, row) => {
        return (
            <span>{String(cell).replace(/\|/g, ', ').replace(/;/g, '\n')}</span>
        );
    };

    expandRow = {
        renderer: row => {
            return (
                <div className="row">
                    <div className="col-sm">
                    </div>
                    <div className="col-sm">
                        <ul style={{'list-style-type': 'none'}}>
                            <li><strong>Abbreviation:</strong> {row.abbreviation}</li>
                            <li><strong>Reaction definition:</strong> {row.definition}</li>
                            <li><strong>DeltaG:</strong> {row.deltag}</li>
                            <li><strong>DeltaG Error:</strong> {row.deltagerr}</li>
                            <li><strong>Direction:</strong> {row.direction}</li>
                            <li><strong>Reversibility:</strong> {row.reversibility}</li>
                            <li><strong>Is Transport:</strong> {row.is_transport}</li>
                            <li><strong>Is Obsolete:</strong> {row.is_obsolete}</li>
                            <li><strong>Source:</strong> {row.source}</li>
                        </ul>
                    </div>
                </div>
            )},
        showExpandColumn: true,
        onlyOneExpanding: true
    };

    state = {
        table_items: [],
        search_text: '',
        columns: [{
            dataField: 'id',
            text: 'ID',
            sort: true,
        }, {
            dataField: 'name',
            text: 'Name',
            sort: true,
        }, {
            dataField: 'equation',
            text: 'Equation',
        }, {
            dataField: 'deltag',
            text: 'deltaG',
            sort: true,
        }, {
            dataField: 'status',
            text: 'Status',
            sort: true,
        }, {
            dataField: 'aliases',
            text: 'Aliases',
            formatter: this.aliasFormater,
        }]
    };

    render() {
        return (
            <BiochemistryTable
                columns={this.state.columns}
                expandRow={this.expandRow}
                githubURL={'https://raw.githubusercontent.com/ModelSEED/ModelSEEDDatabase/dev/Biochemistry/reactions.json'}
                relationEngineURL={'https://ci.kbase.us/services/relation_engine_api/api/query_results/?view=search_reactions&batch_size=9999999'}
            />
        );
    }
}

export default ReactionTable;
