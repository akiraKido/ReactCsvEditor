import * as React from "react";
import { CommaSeparator } from "../../common/CommaSeparator";

export interface CsvRowProps { row: string }

export abstract class CsvRowBase extends React.Component<CsvRowProps, undefined> {

    render() {
        const contents : Array<JSX.Element> = [];
        const separator = new CommaSeparator(this.props.row);
        let index = 0;
        separator.foreach(current => {
            contents.push(this.getCell(current, index++));
        });

        return <tr>{contents}</tr>
    }

    abstract getCell(content: string, key: number): JSX.Element;

}