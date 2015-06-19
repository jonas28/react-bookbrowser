'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
    View,
    ListView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    AppRegistry,
    ActivityIndicatorIOS,
    Navigator,
    TouchableOpacity,
    Animation

} = React;

var BookDetails = require('./BookDetails');
var BookCard = require('./BookCard');

var buildUrl = function(q) {
    return 'https://www.googleapis.com/books/v1/volumes?q='
    + encodeURIComponent(q)
    + '&langRestrict=en&maxResults=40';
};

var ResultsScreen = React.createClass({
    getInitialState: function() {
        return {
            x: 0,
            y: 0,
            lastDragDirectio: 'Drag and Release',
            isLoading: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },
    componentDidMount: function() {
        this.fetchResults(this.props.searchPhrase);
    },

    fetchResults: function(searchPhrase) {
        fetch(buildUrl(searchPhrase))
            .then(response => response.json())
            .then(jsonData => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(jsonData.items)
                });
            console.dir(jsonData.items);
            })
            .catch(error => console.dir(error));
    },

    setPosition: function(e) {
        this.setState({
            x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
            y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
        });
        this.drag.x = e.nativeEvent.pageX;
        this.drag.y = e.nativeEvent.pageY;
    },
    resetPosition: function(e) {
        this.dragging = false;
        var left = e.nativeEvent.pageX < (windowSize.width/2),
            displayText = left ? 'Released left' : 'Released right';

        this.setState({
            x: 0,
            y: 0,
            lastDragDirectio: displayText
        })
    },
    getRotationDegree: function(rotateTop, x) {
        var rotation = ( (x/windowSize.width) * 100)/3;

        var rotate = rotateTop ? 1 : -1,
            rotateString = (rotation * rotate) + 'deg';

        return rotateString;
    },
    getCardStyle: function() {
        var transform = [{translateX: this.state.x}, {translateY: this.state.y}];

        if (this.dragging) {
            transform.push({rotate: this.getRotationDegree(this.rotateTop, this.state.x)})
        }

        return {transform: transform};
    },
    _onStartShouldSetResponder: function(e) {
        this.dragging = true;

        this.rotateTop = e.nativeEvent.locationY <= 150;

        this.drag = {
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        }

        return true;
    },
    _onMoveShouldSetResponder: function(e) {
        return true;
    },

    render: function() {
        if (this.state.isLoading) {
            return this.renderLoadingMessage(); } else {
            return this.renderResults(); }
    },

    renderLoadingMessage: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    Searching for "{this.props.searchPhrase}". </Text>
                <Text style={styles.label}>
                    Please wait...
                </Text>
            </View>
        );
    },

    renderResults: function() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderBook}
            />
        );
    },

    renderBook: function(book) { return (
        <View style={styles.container}>
            <View
                onResponderMove={this.setPosition}
                onResponderRelease={this.resetPosition}
                onStartShouldSetResponder={this._onStartShouldSetResponder}
                onMoveShouldSetResponder={this._onMoveShouldSetResponder}
                style={[styles.card, this.getCardStyle()]}
            >
                <Text>
                    Test
                </Text>
            </View>
        </View>
        );
    },

    showBookDetails: function(book) {
        this.props.navigator.push({
            title: book.volumeInfo.title,
            component: BookCard,
            passProps: {book}
        });
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dragText: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        width: 300,
        height: 300,
        padding: 10
    },
    cardImage: {
        height: 260,
    },
    textLeft: {
        position: 'absolute',
        left:0,
        top:0
    },
    textRight: {
        position: 'absolute',
        right: 0,
        top: 0
    }
});

module.exports = ResultsScreen;
