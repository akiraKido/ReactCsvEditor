import * as React from "react";

export interface CsvTableProps { csv: string; }

export class CsvTable extends React.Component<CsvTableProps, undefined> {

    render() {
        return <div>{this.props.csv}</div>
    }

}