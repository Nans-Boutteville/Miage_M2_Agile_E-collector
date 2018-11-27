import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export const Charges = createReactClass({
    propTypes: {
        icon: PropTypes.string.isRequired,
        size: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        style: PropTypes.object
    },
    getDefaultProps() {
        return {
            size: 24
        };
    },
    _mergeStyles(...args) {
        // This is the m function from "CSS in JS" and can be extracted to a mixin
        return Object.assign({}, ...args);
    },
    renderGraphic() {
        switch (this.props.icon) {
            case '0':
                return (
                    <g><path fill-opacity=".3" d="M2 22h20v-20z"></path></g>
                );
            case '25':
                return (
                    <g><path fill-opacity=".3" d="M2 22h20v-20z"></path><path d="M12 12l-10 10h10z"></path></g>
                );
            case '50':
                return (
                    <g><path fill-opacity=".3" d="M2 22h20v-20z"></path><path d="M14 10l-12 12h12z"></path></g>
                );
            case '75':
                return (
                    <g><path fill-opacity=".3" d="M2 22h20v-20z"></path><path d="M17 7l-15 15h15z"></path></g>
                );
            case '100':
                return (
                    <g><path d="M2 22h20v-20z"></path></g>
                );
            default :
                return (
                    <g><path fill-opacity=".3" d="M22 8v-6l-20 20h16v-14z"></path><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"></path></g>
                );
            // Add more icons here
        }
    },
    render() {
        let styles = {
            fill: "currentcolor",
            verticalAlign: "middle",
            width: this.props.size, // CSS instead of the width attr to support non-pixel units
            height: this.props.size // Prevents scaling issue in IE
        };
        return (
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
                 style={this._mergeStyles(
                     styles,
                     this.props.style // This lets the parent pass custom styles
                 )}>
                {this.renderGraphic()}
            </svg>
        );
    }
});