import React from 'react';
import { Component } from 'react';
import './App.css';
import marked from 'marked';

marked.setOptions({
  breaks: true,
});
const renderer = new marked.Renderer();

class Editor extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Editor Component mounted.');
  }
  render() {
    return (
      <textarea
          id="editor"
          className="dark pane"
          onChange={this.props.handleChange}
          value={this.props.markdown}
      />
    );
  }
}

class Previewer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Previewer Component mounted.');
  }
  render() {
    let options = { renderer: renderer };
    let html = marked(this.props.markdown, options);
    return <div
              id="preview" className="pane"
              dangerouslySetInnerHTML={{ __html: html }}
           />;
  }
}

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class App extends Component {
  constructor(props) {
    super(props);
    // ****************
    this.handleChange = this.handleChange.bind(this);
    // ****************
    this.state = {
      markdown: placeholder
    };
  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }
  componentDidMount() {
    console.log('MarkdownPreviewer Component mounted.');
  }
  render() {
    return (
      <div className="wrapper">
        <Editor handleChange={this.handleChange} markdown={this.state.markdown}/>
        <Previewer markdown={this.state.markdown} />
      </div>
    );
  }
}

export default App;
