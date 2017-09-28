import * as React from "react";
import { CsvCellBase } from "./CsvCellBase";

export interface CsvCellProps { content: string; }

export class CsvHeaderCell extends CsvCellBase {
    getCell(content: JSX.Element): JSX.Element {
        return <th>{content}</th>
    }
}