/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ModalPanel } from "@ui-kitten/components/theme/modal/modalPanel.component";
import { StyleProvider } from "@ui-kitten/components/theme/style/styleProvider.component";
import React from "react";
import styles from "./style.json";

// import mapping from "./mapped.json"
/**
 * `ApplicationProvider` component is designed to be a root of the application.
 *
 * This does basically two things:
 * - Provides styles for basic components;
 * - Renders modal window which is used to be common for all elements presented as modal;
 *
 * @extends React.Component
 *
 * @property {SchemaType} mapping - Determines the mapping for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva-design/eva`).
 *
 * @property {CustomSchemaType} customMapping - Determines the customization mapping.
 * This is merged with `mapping` property and designed to be used components customization.
 *
 * @property {ThemeType} theme - Determines the theme for basic components.
 * This is designed to be provided by developers team and can be imported from npm package (e.g. `@eva-design/eva`).
 *
 * @property {ReactNode} children - Determines application root component.
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { ApplicationProvider, Layout, Text } from '../..';
 * import { mapping, light as lightTheme } from '@eva-design/eva';
 *
 * export default class App extends React.Component {
 *
 *   render() {
 *     return (
 *       <ApplicationProvider
 *         mapping={mapping}
 *         theme={lightTheme}>
 *         <Layout style={{ flex: 1 }}>
 *           <Text>Welcome to UI Kitten</Text>
 *         </Layout>
 *       </ApplicationProvider>
 *     );
 *   }
 * }
 * ```
 */
export class CustomApplicationProvider extends React.Component {
  constructor(props) {
    super(props);

    // this.schemaProcessor = new SchemaProcessor();
    // this.createStyles = (mapping, custom) => {
    //     const customizedMapping = merge({}, mapping, custom);
    //     return this.schemaProcessor.process(customizedMapping);
    // };

    // const { mapping, customMapping, theme } = this.props;

    // const styles = this.createStyles(mapping, customMapping);

    this.state = { styles };
  }
  render() {
    return React.createElement(
      StyleProvider,
      { theme: this.props.theme, styles: this.state.styles },
      React.createElement(ModalPanel, null, this.props.children)
    );
  }
}
//# sourceMappingURL=applicationProvider.component.js.map
