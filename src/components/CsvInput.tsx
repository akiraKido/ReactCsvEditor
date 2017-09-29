import * as React from "react";

export interface CsvInputProps { onButtonDown: (csv:string) => void }
interface CsvInputState { input:string }

export class CsvInput extends React.Component<CsvInputProps, CsvInputState> {

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.onButtonDown(e.target.value);
    }

    render() {
        return (
            <div>
                <textarea 
                    id="csvInput"
                    cols={100} rows={3} 
                    onChange={e => this.handleChange(e)}>
                </textarea>
            </div>
        );
    }
}