import * as React from "react";
import { CsvInput } from "./CsvInput";
import { CsvTable } from "./CsvTable";

export class CsvEditor extends React.Component<undefined, undefined> {
    
    private _table: CsvTable;

    onCsvButtonClick(csv: string) {
        this._table.updateTable(csv);
    }

    render() {
        return (
            <div>
                <CsvInput onButtonDown={this.onCsvButtonClick.bind(this)}/>
                <CsvTable ref={table => this._table = table}/>
            </div>
        );
    }
}