// @flow

import React, { Component } from 'react';

import type { Node, ComponentType } from 'react';

type CreateContextFn = <T>(defaultValue: T) => {
  Provider: ComponentType<{value: T}>,
  Consumer: ComponentType<{children: (value: T) => Node}>,
};

// $FlowFixMe: Cannot call React.createContext because property createContext is missing in object type
const createReactContext: CreateContextFn = React.createContext;

// first we will make a new context
const MyContext = createReactContext();

type Props = {
  children: Node
};

type State = {
  name: string,
  age: number,
  cool: boolean
};

// Then create a provider Component
class MyProvider extends Component<Props, State> {
  state = {
    name: 'Wes',
    age: 100,
    cool: true
  };

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        growAYearOlder: () => this.setState({
          age: this.state.age + 1
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

const Family = (props) => (
  <div className="family">
    <Person />
  </div>
)

class Person extends Component<{}> {
  render() {
    return (
      <div className="person">
        <MyContext.Consumer>
          {(context) => (
            context &&
              <div>
                <p>Age: {context.state.age}</p>
                <p>Name: {context.state.name}</p>
                <button onClick={context.growAYearOlder}>🍰🍥🎂</button>
              </div>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}


class App extends Component<{}> {
  render() {
    return (
      <MyProvider>
        <div>
          <p>I'm the app</p>
          <Family />
        </div>
      </MyProvider>
    );
  }
}


export default App;
