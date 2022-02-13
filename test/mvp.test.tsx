import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";

import {Demo} from "../src/Demo"




describe('create', function () {


   it('should display pass in number', function () {
       let container = document.createElement('div');
       document.body.appendChild(container);
       act(() => {
           ReactDOM.render(<Demo theme="theme1" setTheme={console.log}/>, container);
       })
       const header = container.querySelector('h1');
       expect(header.textContent).toBe("loading...")
   });
});