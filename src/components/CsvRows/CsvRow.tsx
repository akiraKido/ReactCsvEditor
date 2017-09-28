import * as React from "react";
import { CsvRowBase } from "./CsvRowBase";
import { CsvCell } from "../CsvCells/CsvCell";

export class CsvRow extends CsvRowBase {

    getCell(content: string, key: number): JSX.Element {
        return <CsvCell content={content} key={key}/>
    }

}