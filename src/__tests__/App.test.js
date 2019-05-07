import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { shallow } from "enzyme";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it("renders without crashing", () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});

it("renders without crashing", () => {
  const app = shallow(<App />);
  expect(app).toBeDefined();
});
