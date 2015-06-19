/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
} = React;

var SearchScreen = require('./SearchScreen');



var BookBrowser = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: SearchScreen,
                    title: 'Search',
                    passProps: { placeholder: 'react native' }
                }}
                style={styles.navContainer}
            />
        );
    }
});

var styles = StyleSheet.create({
   navContainer: {
       flex: 1
   }
})

AppRegistry.registerComponent('BookBrowser', () => BookBrowser);
