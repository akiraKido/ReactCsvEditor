import * as React from "react";

interface CsvTableState { hoge: string; }

export class CsvTable extends React.Component<undefined, CsvTableState> {

    constructor() {
        super();

        this.state = { hoge: "" };
    }

    updateTable(csv:string) {
        this.setState({hoge: csv});
    }

    render() {
        return <div>{this.state.hoge}</div>
    }

}