import * as React from "react";
import * as ReactDOM from "react-dom";

import {CsvEditor} from "./components/CsvEditor";
import { ContextMenuProvider } from "./components/ReactContextify/Component/ContextMenuProvider";
import { MyAwesomeMenu } from "./components/TestMenu";

const Foo = () => <ContextMenuProvider id="menu_id" renderTag="div">bar</ContextMenuProvider>;
const Bar = () => <ContextMenuProvider id="menu_id" renderTag="div">baz</ContextMenuProvider>;

const App = () => (
    <div>
        <Foo />
        <Bar />
        <MyAwesomeMenu />
        <CsvEditor />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById("contents")
)