import React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { AppNavBar } from "baseui/app-nav-bar";
import Table from './components/table';

// Base UI Kit
const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {/* Header */}
        <AppNavBar
          title="MAF Explorer"
        />
        {/* table */}
        <Table />
      </BaseProvider>
    </StyletronProvider>
  );

}

export default App
