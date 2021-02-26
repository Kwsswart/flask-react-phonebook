import React, { Component, Fragment } from 'react';

class FormField extends Component {

    render() {
        const { type, label, fieldId, hasChanged, value} = this.props;
        
        return (
        <Fragment>
            <div className="form-group row" style={{ margin: "0.5%"}}>
                <label htmlFor={fieldId} className="col-sm-4 col-form-label">{label}</label>
                <div className="col-sm-8 ">
                    <input type={type} className={"form-control"} value={value} id={fieldId} onChange={hasChanged} />
                </div>
            </div>
        </Fragment>
        );
    }

    }


export default FormField;