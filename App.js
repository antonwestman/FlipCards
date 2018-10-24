import React from 'react';
import { withNamespaces } from 'react-i18next';
import { createStackNavigator } from 'react-navigation';
import i18n from './locales/i18n';
import PointAtAnimals from './containers/PointAtAnimals';

const Stack = createStackNavigator({
  PointAtAnimals: { screen: PointAtAnimals },
});

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedStack = ({ t }) => <Stack screenProps={{ t }} />;
const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

// The entry point using a react navigation stack navigation
// gets wrapped by the I18nextProvider enabling using translations
// https://github.com/i18next/react-i18next#i18nextprovider
export default class App extends React.Component {
  render() {
    return <ReloadAppOnLanguageChange />;
  }
}