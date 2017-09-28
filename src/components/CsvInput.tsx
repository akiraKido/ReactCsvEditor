import * as React from "react";
import {CsvTable} from "./CsvTable";

export interface CsvInputProps { onButtonDown: (csv:string) => void }
interface CsvInputState { input:string }

export class CsvInput extends React.Component<CsvInputProps, CsvInputState> {

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({input: e.target.value});
    }

    render() {
        return (
            <div>
                <textarea 
                    id="csvInput"
                    cols={100} rows={3} 
                    onChange={e => this.handleChange(e)}>
                </textarea>
                <input 
                    type="button"
                    value="表示"
                    onClick={ _ => this.props.onButtonDown(this.state.input)}
                />
            </div>
        );
    }
}