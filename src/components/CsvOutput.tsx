import * as React from "react";

export interface CsvOutputProps { csv: string }

export class CsvOutput extends React.Component<CsvOutputProps, undefined>{
    render() {
        return (
            <div>
                <textarea
                    value={this.props.csv} />
            </div>
        );
    }
}