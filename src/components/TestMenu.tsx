import * as React from "react";
import { ContextMenu } from "./ReactContextify/Component/ContextMenu";
import { Item } from "./ReactContextify/Component/Item";
import { IconFont } from "./ReactContextify/Component/IconFont";

function onClick(targetNode: JSX.Element, ref: any, data: any) {
    console.log(targetNode);
    console.log(ref);
    console.log(data);
}

export const MyAwesomeMenu = () => (
    <ContextMenu id='menu_id'>
        <Item leftIcon={<IconFont className="fa fa-plus" />} onClick={onClick}>
            Add
        </Item>
        <Item leftIcon={<IconFont className="material-icons">remove_circle</IconFont>} onClick={onClick}>
            Remove
        </Item>
        <Item><IconFont className="fa fa-scissors" />cut</Item>
        <Item disabled>
            Paste
        </Item>
    </ContextMenu>
);