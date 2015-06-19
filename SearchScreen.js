/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    StyleSheet,
    } = React;

var ResultsScreen = require('./ResultsScreen');

var SearchScreen = React.createClass({

    gotoResultsScreen: function(searchPhrase) { this.props.navigator.push({
        title: 'Results',
        component: ResultsScreen,
        passProps: { 'searchPhrase': searchPhrase }
    }); },



    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>
                    BookBrowser
                </Text>
                <Text style={styles.label}>
                    Find awesome books containing:
                </Text>
                <TextInput
                    placeholder={this.props.placeholder}
                    returnKeyType="search"
                    enablesReturnKeyAutomatically={true}
                    onEndEditing={ event => this.gotoResultsScreen(event.nativeEvent.text) }
                    style={styles.textInput}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5AC8FA',
    },
    headline: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 28,
    }, label: {
        fontSize: 24,
        fontWeight: 'normal',
        color: '#FFF',
        marginBottom: 8,
    },
    textInput: {
        borderColor: '#8E8E93',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
        height: 40,
        marginLeft: 60,
        marginRight: 60,
        padding: 8,
    }
})

module.exports = SearchScreen;