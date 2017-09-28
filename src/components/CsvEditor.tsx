import * as React from "react";
import { CsvInput } from "./CsvInput";
import { CsvTable } from "./CsvTable";

interface CsvEditorState { csv: string; }

export class CsvEditor extends React.Component<undefined, CsvEditorState> {
    
    constructor(){
        super();
        this.state = { csv: "" };
    }

    onCsvButtonClick(csv: string) {
        this.setState({csv: csv});
    }

    render() {
        return (
            <div>
                <CsvInput onButtonDown={this.onCsvButtonClick.bind(this)}/>
                <CsvTable csv={this.state.csv}/>
            </div>
        );
    }
}