import * as React from "react";
import * as cx from "classnames";

import {Item} from "./Item";
import {CssClasses} from "../cssClasses";
import {EventManager} from "../util/EventManager"

// static propTypes = {
//     id: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.number
//     ]).isRequired,
//     children: childrenOfType(Item).isRequired,
//     theme: PropTypes.string,
//     animation: PropTypes.string
//   };

interface ContextMenuProps {
    id: string | number;
    children: JSX.Element | JSX.Element[];
    theme?: string;
    animation?:string;
}

interface ContextMenuState {
    x: number;
    y: number;
    visible: boolean;
    targetNode: object;
}

export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {

    static THEME = {
        light: "light",
        dark: "dark"
    };

    static ANIMATION = {
        fade: "fade",
        flip: "flip",
        pop: "pop",
        zoom: "zoom"
    }

    private menu: HTMLDivElement;
    private refsFromProvider: string;
    private token: number;

    constructor() {
        super();

        this.props = {
            id: null,
            children: null,
            theme: null,
            animation: null
        }

        this.state = {
            x: 0,
            y: 0,
            visible: false,
            targetNode: null
        };

        this.menu = null;
        this.refsFromProvider = null;
        this.token = null;
    }

    componentDidMount() {
        EventManager.on(`display::${this.props.id}`, (e: MouseEvent, refsFromProvider: any) => this.show(e, refsFromProvider));
        this.token = EventManager.on("hideAll", this.hide);
    }

    componentWillUnmount() {
        EventManager.off(`display::${this.props.id}`);
        EventManager.off("hideAll", this.token);
    }

    bindWindowEvent = () => {
        window.addEventListener("resize", this.hide);
        window.addEventListener("contextmenu", this.hide);
        window.addEventListener("mousedown", this.hide);
        window.addEventListener("click", this.hide);
        window.addEventListener("scroll", this.hide);
    };

    unbindWindowEvent() {
        window.removeEventListener("resize", this.hide);
        window.removeEventListener("contextmenu", this.hide);
        window.removeEventListener("mousedown", this.hide);
        window.removeEventListener("click", this.hide);
        window.removeEventListener("scroll", this.hide);
    }

    onMouseEnter = () => window.removeEventListener("mousedown", this.hide);
    onMouseLeave = () => window.addEventListener("mousedown", this.hide);

    hide = (e: MouseEvent) => {
        if(typeof(e) !== "undefined" && e.button === 2 && e.type !== "contextmenu") {
            return;
        }
        this.unbindWindowEvent();
        this.setState({visible: false});
    };

    setRef = (ref: HTMLDivElement) => {
        this.menu = ref;
    };    

    setMenuPosition() {
        const browserSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const menuSize = {
            width: this.menu.offsetWidth,
            height: this.menu.offsetHeight
        }

        let {x,y} = this.state;
        if((x + menuSize.width) > browserSize.width) {
            x -= ((x + menuSize.width) - browserSize.width);
        }

        if((y + menuSize.height) > browserSize.height) {
            y -= ((y + menuSize.height) - browserSize.height);
        }

        this.setState({
            x,
            y
        }, this.bindWindowEvent);
    }

    getMousePosition(e:MouseEvent | TouchEvent) {
        const pos : { x:number, y:number} = {x: 0, y: 0};

        if(e instanceof MouseEvent) {
            pos.x = e.clientX;
            pos.y = e.clientY;
        } else if (e instanceof TouchEvent) {
            const touches = e.changedTouches;

            if(touches !== null && touches.length > 0) {
                pos.x = touches[0].clientX;
                pos.y = touches[0].clientY;
            }
        }

        // ass coverage
        if(pos.x === null || pos.x < 0) pos.x = 0;
        if(pos.y === null || pos.y < 0) pos.y = 0;

        return pos;
    }

    cloneItem = (item: React.ReactElement<any>) => React.cloneElement(item, {
        targetNode: this.state.targetNode,
        refsFromProvider: this.refsFromProvider
    });

    getMenuItem(): React.ReactElement<any>[] {
        return React.Children.map(
            React.Children.toArray(this.props.children).filter(React.isValidElement),
            this.cloneItem
        )
    }

    getMenuStyle(): React.CSSProperties {
        return {
            left: this.state.x,
            top: this.state.y + 1,
            opacity: 1
        };
    }

    getMenuClasses() {
        const {theme, animation} = this.props;

        return cx(
            CssClasses.MENU,
            {
                [CssClasses.THEME + theme]: theme !== null,
                [CssClasses.ANIMATION_WILL_ENTER + animation]: animation !== null
            }
        );
    }

    show = (e: MouseEvent, refsFromProvider: any) => {
        e.stopPropagation();
        EventManager.emit("hideAll");
        this.refsFromProvider = refsFromProvider;

        const { x, y } = this.getMousePosition(e);

        this.setState({
            visible: true,
            x,
            y,
            targetNode: e.target
        }, this.setMenuPosition);
    };

    render() {
        return this.state.visible
            ?
                <div
                    className={this.getMenuClasses()}
                    style={this.getMenuStyle()}
                    ref={this.setRef}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                    <div>
                        {this.getMenuItem()}
                    </div>
                </div>
            : null;
    }
}