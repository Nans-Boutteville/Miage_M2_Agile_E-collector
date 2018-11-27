import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export const Battery = createReactClass({
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
            case '20':
                return (
                    <g><path d="M7 17v3.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-3.67h-10z"></path><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v11.67h10v-11.67z"></path></g>
                );
            case '30':
                return (
                    <g><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v9.67h10v-9.67z"></path><path d="M7 15v5.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-5.67h-10z"></path></g>
                );
            case '50':
                return (
                    <g><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v7.67h10v-7.67z"></path><path d="M7 13v7.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-7.67h-10z"></path></g>
                );
            case '60':
                return (
                    <g><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v5.67h10v-5.67z"></path><path d="M7 11v9.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-9.67h-10z"></path></g>
                );
            case '80':
                return (
                    <g><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v3.67h10v-3.67z"></path><path d="M7 9v11.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-11.67h-10z"></path></g>
                );
            case '90':
                return (
                    <g><path fill-opacity=".3" d="M17 5.33c0-.73-.6-1.33-1.33-1.33h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v2.67h10v-2.67z"></path><path d="M7 8v12.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-12.67h-10z"></path></g>
                );
            case 'alert':
                return (
                    <g><path d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v15.33c0 .74.6 1.34 1.33 1.34h7.33c.74 0 1.34-.6 1.34-1.33v-15.34c0-.73-.6-1.33-1.33-1.33zm-2.67 14h-2v-2h2v2zm0-4h-2v-5h2v5z"></path></g>
                );
            case 'charging-20':
                return (
                    <g><path d="M11 20v-3h-4v3.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-3.67h-4.4l-1.6 3z"></path><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v11.67h4v-2.5h-2l4-7.5v5.5h2l-2.4 4.5h4.4v-11.67c0-.73-.6-1.33-1.33-1.33z"></path></g>
                );
            case 'charging-30':
                return (
                    <g><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v9.17h2l4-7.5v5.5h2l-1.07 2h3.07v-9.17c0-.73-.6-1.33-1.33-1.33z"></path><path d="M11 20v-5.5h-4v6.17c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-6.17h-3.07l-2.93 5.5z"></path></g>
                );
            case 'charging-50':
                return (
                    <g><path d="M14.47 13.5l-3.47 6.5v-5.5h-2l.53-1h-2.53v7.17c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-7.17h-2.53z"></path><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v8.17h2.53l3.47-6.5v5.5h2l-.53 1h2.53v-8.17c0-.73-.6-1.33-1.33-1.33z"></path></g>
                );
            case 'charging-60':
                return (
                    <g><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v5.67h3.87l2.13-4v4h4v-5.67c0-.73-.6-1.33-1.33-1.33z"></path><path d="M13 12.5h2l-4 7.5v-5.5h-2l1.87-3.5h-3.87v9.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-9.67h-4v1.5z"></path></g>
                );
            case 'charging-80':
                return (
                    <g><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v3.67h4.93l1.07-2v2h4v-3.67c0-.73-.6-1.33-1.33-1.33z"></path><path d="M13 12.5h2l-4 7.5v-5.5h-2l2.93-5.5h-4.93v11.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-11.67h-4v3.5z"></path></g>
                );
            case 'charging-90':
                return (
                    <g><path fill-opacity=".3" d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v2.67h5.47l.53-1v1h4v-2.67c0-.73-.6-1.33-1.33-1.33z"></path><path d="M13 12.5h2l-4 7.5v-5.5h-2l3.47-6.5h-5.47v12.67c0 .73.6 1.33 1.33 1.33h7.33c.74 0 1.34-.6 1.34-1.33v-12.67h-4v4.5z"></path></g>
                );
            case 'charging-100':
                return (
                    <g><path d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v15.33c0 .74.6 1.34 1.33 1.34h7.33c.74 0 1.34-.6 1.34-1.33v-15.34c0-.73-.6-1.33-1.33-1.33zm-4.67 16v-5.5h-2l4-7.5v5.5h2l-4 7.5z"></path></g>
                );
            case '100':
                return (
                    <g><path d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v15.33c0 .74.6 1.34 1.33 1.34h7.33c.74 0 1.34-.6 1.34-1.33v-15.34c0-.73-.6-1.33-1.33-1.33z"></path></g>
                );
            default:
                return (
                    <g><path d="M15.67 4h-1.67v-2h-4v2h-1.67c-.73 0-1.33.6-1.33 1.33v15.33c0 .74.6 1.34 1.33 1.34h7.33c.74 0 1.34-.6 1.34-1.33v-15.34c0-.73-.6-1.33-1.33-1.33zm-2.72 13.95h-1.9v-1.9h1.9v1.9zm1.35-5.26s-.38.42-.67.71c-.48.48-.83 1.15-.83 1.6h-1.6c0-.83.46-1.52.93-2l.93-.94c.27-.27.44-.65.44-1.06 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5h-1.5c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .66-.27 1.26-.7 1.69z"></path></g>
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