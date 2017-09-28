import * as React from "react";
import { CsvRowBase } from "./CsvRowBase";
import { CsvCellBase } from "./CsvCellBase";

export class CsvRow extends CsvRowBase {

    makeCell(content: string, key: number): JSX.Element {
        return <CsvCell content={content} key={key}/>
    }

}

class CsvCell extends CsvCellBase {

    getTag(content: JSX.Element): JSX.Element {
        return <td>{content}</td>
    }
    
}