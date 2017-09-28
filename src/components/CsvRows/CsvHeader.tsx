import * as React from "react";
import { CsvRowBase } from "./CsvRowBase";
import { CsvHeaderCell } from "./CsvCells/CsvHeaderCell";

export class CsvHeader extends CsvRowBase {

    getCell(content: string, key:number): JSX.Element {
        return <CsvHeaderCell content={content} key={key} />
    }

}