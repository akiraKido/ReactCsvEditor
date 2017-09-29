import * as React from "react";
import { EventManager } from "../util/EventManager";

export interface ContextMenuProviderProps {
    id: string | number;
    children: JSX.Element | JSX.Element[] | string;
    renderTag?: string;
    event?: string;
    className?: string;
    style?: object;
}

export class ContextMenuProvider extends React.Component<ContextMenuProviderProps, undefined> {

    childrenRefs: any[];

    public static defaultProps: Partial<ContextMenuProviderProps> = {
        renderTag: "div",
        event: "onContextMenu",
        className: "",
        style: {}
    }

    handleEvent = (e:React.SyntheticEvent<any>) => {
        e.preventDefault();
        EventManager.emit(
            `display::${this.props.id}`,
            e.nativeEvent,
            this.childrenRefs.length === 1
                ? this.childrenRefs[0]
                : this.childrenRefs
        );
    };

    getChildren() {
        const { 
            id,
            renderTag,
            event,
            children,
            className,
            style,
            ...rest
        } = this.props;

        this.childrenRefs = [];
        const setChildRef = (ref: boolean) => ref === null || this.childrenRefs.push(ref);

        const c = React.Children.map(this.props.children,
            (child : React.DetailedReactHTMLElement<any, any>) => (
                React.isValidElement(child)
                    ? React.cloneElement(child, {...rest, ref: setChildRef})
                    : child
            ));
        console.log(c);
        return c;
    }

    render() {
        const {renderTag, event, className, style} = this.props;
        const attributes = Object.assign({}, {
            [event]: this.handleEvent,
            className,
            style
        });

        console.log(renderTag);
        console.log(attributes);

        return React.createElement(
            renderTag,
            attributes,
            this.getChildren()
        );
    }

}