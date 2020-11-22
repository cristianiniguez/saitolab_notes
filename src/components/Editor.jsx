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
        <div className='editor__manual my-4'>
          <h2 className='text-primary font-weight-bold'>How to use this editor?</h2>
          <p>
            This editor can work with markdown language. If you don't know markdown language yet,
            there are a lot of tutorials on the web. But this manual will give you a fast view of
            this language.
          </p>
          <p>Try those symbols in the Content input (they works):</p>
          <ul>
            <li>
              Wrte <code>#</code> and a space at the start of a paragraph to create a header. You
              can use two or more <code>#</code> to create smaller headers.
            </li>
            <li>
              Write <code>*</code> and a space at the start of a paragraph to create an ordered
              lists (with bullets). You can write numbers like <code>1. 2. 3.</code> to create
              ordered lists (with enumerations).
            </li>
            <li>
              Write <code>*</code> before and after a piece of text and these will be displayed{' '}
              <i>like this</i>. With <code>**</code> to display <strong>like this</strong> and{' '}
              <code>***</code> to display{' '}
              <strong>
                <i>like this</i>
              </strong>
            </li>
            <li>Be sure to write two line breaks to start a new paragraph.</li>
          </ul>
          <p>
            With these features you will write good notes, but if you like to know more about
            markdown (because there is more), well look for markdown in Youtube and the rest is up
            to you. Happy Writting 👨🏻.
          </p>
        </div>
      </form>
    );
  }
}

export default Editor;
