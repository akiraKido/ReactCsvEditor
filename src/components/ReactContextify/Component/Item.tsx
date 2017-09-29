import * as React from "react";
import * as cx from "classnames";

import {CssClasses} from "../cssClasses"

export interface ItemProps {
    children: React.ReactNode
    disabled?: boolean;
    targetNode?: object;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: (targetNode: object, refsFromProvider: object | object[], data:any ) => void;
    data?: any;
    refsFromProvider?: object | object[];
}

export class Item extends React.Component<ItemProps, undefined> {

    public static defaultProps: Partial<ItemProps> = {
        leftIcon: "",
        rightIcon: "",
        disabled: false,
        onClick: () => {},
        targetNode: {},
        data: null,
        refsFromProvider: []
    }

    handleClick(e: MouseEvent) {
        this.props.disabled
            ? e.stopPropagation
            : this.props.onClick(
                this.props.targetNode,
                this.props.refsFromProvider,
                this.props.data
            );
    }

    buildItem(): JSX.Element {
        return (
            <div className={CssClasses.ITEM_DATA}>
                {this.props.leftIcon}
                {this.props.children}
                {this.props.rightIcon}
            </div>
        );
    }

    render() {
        const className = cx(CssClasses.ITEM, {
            [`${CssClasses.ITEM_DISABLED}`]: this.props.disabled
        });

        return (
            <div className={className} onClick={this.handleClick.bind(this)} role="presentation">
                {this.buildItem()}
            </div>
        )
    }
}