import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from "../actions";

class PostsNew extends Component {

    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
          <div className={className}>
              <label>{field.label}</label>
              <input
                  className="form-control"
                  type="text"
                  {...field.input}
              />
              <div className="text-help">
                  {field.meta.touched ? field.meta.error : ''}
              </div>
          </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title" component={this.renderField} label="Title" />
                <Field name="categories" component={this.renderField} label="Categories" />
                <Field name="content" component={this.renderField} label="Post Content" />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to='/'>
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(yolo) => {title: 'asdf', categories: 'asdf', content: 'saf' }
    const errors = {};

    // validate the inputs from 'yolo'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if (!values.content) {
        errors.content = "Enter some content!";
    }

    // if errors object is empty, the form is fine to submit
    // if errors has any properties, redux form assumes that form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostNewForm'
})(
    connect(null, {createPost})(PostsNew)
);