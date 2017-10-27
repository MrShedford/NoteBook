import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import fire from './fire';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       editorState: EditorState.createEmpty(),
    }
  }

   onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    })
  };
	
	get contentState() {
    const contentState = this.state.editorState.getCurrentContent();
    const rawJson = convertToRaw(contentState);
    const jsonStr = JSON.stringify(rawJson, null, 1);
	const plainText = contentState.getPlainText();
    //const plainText = contentState.getBlocksAsArray().map(block => block.getText());
    return {
      jsonStr,
      plainText
    };
  }

	handleSubmit(content) {
		const firebaseRef = fire.database().ref();
		firebaseRef.child("Notes").push(content);
	}

	handleLoad() {
		console.log("clicked");
		const firebaseRef = fire.database().ref();
		firebaseRef.child("Notes").on("value", 
		function(data) {
			console.log(data.val());
		}, 
		function (error) {
			console.log("Error: "+error.code);
		}
	  );
	}


  render() {
	const { editorState } = this.state;
    return (
    <div id="container">
      <p>Rich text editor for Notebook: </p>
      <div id="editorbox" onClick={this.focus}>
         <Editor
			placeholder="Type a note..."
			editorState={editorState}
			onEditorStateChange={this.onEditorStateChange}
			hashtag={{separator: ' ',trigger: '#',}}
		/>
      </div>
	  <div>
		<p id="json"> JSON: {this.contentState.jsonStr}</p>
		<p id="plaintext"> Plain Text: {this.contentState.plainText}</p>
		<button 
			type="button"
			id="submit"
			onClick={this.handleSubmit.bind(this, this.contentState.jsonStr)}
		>Save
		</button>
		<button 
			type="button"
			id="load"
			onClick={this.handleLoad.bind(this)}
		>Load
		</button>
	  </div>
	</div>
	
    );
  } 
}

export default App;

