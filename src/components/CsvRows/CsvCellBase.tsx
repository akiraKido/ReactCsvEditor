import * as React from "react";

export interface CsvCellProps { content: string; }

export abstract class CsvCellBase extends React.Component<CsvCellProps, undefined> {

    getHtml(content: string) {

        if(/^https?:\/\//.test(content)) {
            let displayText: string;
            if(content.length > 20) {
                const first = content.substr(0, 10);
                const last = content.slice(-10);
                displayText = `${first}...${last}`;
            } else {
                displayText = content;
            }
            return <a href={content}>{displayText}</a>
        }
        return <span>{content}</span>;
    }

    render() {
        return this.getTag(this.getHtml(this.props.content));
    }

    abstract getTag(content: JSX.Element): JSX.Element;

}