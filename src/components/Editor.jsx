import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import '../assets/components/Editor.css';

class Editor extends Component {
  state = {
    title: this.props.default?.title || '',
    content: this.props.default?.content || '',
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <form className='editor my-4' onSubmit={this.handleSubmit}>
        <div className='bg-primary p-2'>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              name='title'
              required
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <div className='input-group-append'>
              <button className='btn btn-success' type='submit'>
                {this.props.type} <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        </div>
        <div className='editor__fields'>
          <div className='editor__textarea'>
            <textarea
              name='content'
              rows='10'
              className='form-control'
              required
              onChange={this.handleChange}
              value={this.state.content}
              placeholder='Content'
            ></textarea>
          </div>
          <div className='editor__preview border p-2'>
            <Markdown>{this.state.content}</Markdown>
          </div>
        </div>
      </form>
    );
  }
}

export default Editor;
