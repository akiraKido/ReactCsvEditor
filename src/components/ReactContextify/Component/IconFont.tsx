import * as React from "react";
import * as cx from "classnames";

import {CssClasses} from "../CssClasses";

export interface IconFontProps {
    className?: string;
    style?: object,
    children?: React.ReactNode
}

export class IconFont extends React.Component<IconFontProps, undefined> {

    public static defaultProps: IconFontProps = {
        className: "",
        style: {},
        children: ""
    }

    render() {
        const className = cx(CssClasses.ITEM_ICON, this.props.className);
        const attributes = Object.assign(
            { className },
            Object.keys(this.props.style).length > 0 ? { style: this.props.style} : {}
        );

        return <i {...attributes}>{this.props.children}</i>;
    }
}