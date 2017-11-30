import React, { Component } from 'react';
import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import firebase, {auth, provider} from './firebase.js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';
import '../App.js';

class NoteBookEditor extends Component {
  constructor(props) {
	super(props);
  	console.log(window.key);	
    this.state = {
       editorState: EditorState.createEmpty(),
       key: ''
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
	//const plainText = contentState.getBlocksAsArray().map(block => block.getText());
	const plainText = contentState.getPlainText();
    return {
      jsonStr,
      plainText
    };
  }
	

  handleSubmit(e) { // saving text
    const db = firebase.database();
    db.ref("notebook/"+window.key+"/text").set(e);
  }

  setEditorContent () { // loading text
	const db = firebase.database().ref().child("notebook").child(window.key).child("text");
	db.on('value',(snapshot) => {
	const data = snapshot.val();
	console.log(data);
	if(data == "") {
		// do nothing
	} else {
		const parsedData = convertFromRaw(JSON.parse(data));
		const editorState = EditorState.push(this.state.editorState, parsedData);
		this.setState({ editorState });
		}
	});
  }

  render() {
	const { editorState } = this.state;
    return (
    <div id="container">
      <div id="editorbox" onClick={this.focus}>
         <Editor
			placeholder="Type a note..."
			editorState={editorState}
			onEditorStateChange={this.onEditorStateChange}
			hashtag={{separator: ' ',trigger: '#',}}
			toolbar={{options:['inline','blockType','fontFamily','list','textAlign','colorPicker','history']}}
		/>
      </div>
	  {
		<div>
			{/*
			<p id="json1">{this.contentState.jsonStr}</p>
			<p id="plaintext"> Plain Text: {this.contentState.plainText}</p>
			onClick={this.handleLoad.bind(this)}
		    */}
			<button type="button" id="load" onClick={() => this.setEditorContent()}>Load</button>
			<button type="button" id="submit" onClick={this.handleSubmit.bind(this, this.contentState.jsonStr)}>Save</button>
	  	</div>
	  }
	</div>
    );
  } 
}	

export default NoteBookEditor;

