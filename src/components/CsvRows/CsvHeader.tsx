import * as React from "react";
import { CsvRowBase } from "./CsvRowBase";
import { CsvCellBase } from "./CsvCellBase";

export class CsvHeader extends CsvRowBase {

    makeCell(content: string, key:number): JSX.Element {
        return <CsvHeaderCell content={content} key={key} />
    }

}

class CsvHeaderCell extends CsvCellBase {

    getTag(content: JSX.Element): JSX.Element {
        return <th>{content}</th>
    }

}