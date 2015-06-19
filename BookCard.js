'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
    StyleSheet,
    AppRegistry,
    Text,
    View,
    ActivityIndicatorIOS,
    Image,
    Navigator,
    TouchableOpacity,
    Animation
    } = React;

var BookCard = React.createClass({
    getInitialState: function() {
        return {
            x: 0,
            y: 0,
            lastDragDirectio: 'Drag and Release'
        }
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

        return (
            <View style={styles.container}>
                <View
                    onResponderMove={this.setPosition}
                    onResponderRelease={this.resetPosition}
                    onStartShouldSetResponder={this._onStartShouldSetResponder}
                    onMoveShouldSetResponder={this._onMoveShouldSetResponder}
                    style={[styles.card, this.getCardStyle()]}
                >
                    <Image source={{uri: this.props.book.volumeInfo.imageLinks.smallThumbnail}} style={styles.cardImage} />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.textLeft}>{this.props.book.volumeInfo.title}</Text>
                        <Text style={styles.textRight}>{this.props.book.volumeInfo.authors[0]}</Text>
                    </View>
                </View>
                <View style={styles.dragText}>
                    <Text>{this.state.lastDragDirectio}</Text>
                </View>
            </View>
        );
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

module.exports = BookCard;