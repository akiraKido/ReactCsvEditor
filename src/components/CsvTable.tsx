import * as React from "react";
import { CsvHeader } from "./CsvRows/CsvHeader";
import { CsvRow } from "./CsvRows/CsvRow";

export interface CsvTableProps { csv: string; }

export class CsvTable extends React.Component<CsvTableProps, undefined> {

    render() {
        const rows: string[] = this.props.csv.split("\n");
        const header = rows.slice(0,1)[0];
        const body = rows.slice(1);

        const headerRow = <CsvHeader row={header} />
        const bodyRows = body.map((row, i) => {
            return <CsvRow row={row} key={i} />
        });

        return (
            <table>
                <thead>{headerRow}</thead>
                <tbody>{bodyRows}</tbody>
            </table>
        );
    }

}