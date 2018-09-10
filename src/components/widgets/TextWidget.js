// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

// IMPORT PROJECT REFERENCES
import {WidgetType} from '../state/reducers/DashboardReducer';
import {updateTextEditor} from '../../services/DashboardService';

export class TextWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (value) => {
        this.setState({ value });
        let textEditor = value.toString('html');
        updateTextEditor(this.props.widget.widgetIndex, this.props.widget.id, textEditor);
    };

    render() {
        const widget = this.props.widget;
        return (
            <div className="row">
                {widget.editMode &&
                    <div className={widget.widgetType !== WidgetType.CHOOSE ? 'container-fluid widget-content' : 'container-fluid'}>
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <label className="widget-title mb-2">Text Content:</label>
                                <RichTextEditor
                                    value={this.state.value}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>                        
                    </div>
                }
                {!widget.editMode &&
                    <div className="container-fluid">
                        <div dangerouslySetInnerHTML={this.createMarkup(this.state.value.toString('html'))}></div>                        
                    </div>
                }
            </div>            
        );
    }

    createMarkup(html) {
        return {__html: html};
    }
}

TextWidget.propTypes = {
    widget: PropTypes.shape({
        id: PropTypes.number.isRequired,
        widgetIndex: PropTypes.string.isRequired
    }),
    onChange: PropTypes.func
};

// export default MyStatefulEditor;