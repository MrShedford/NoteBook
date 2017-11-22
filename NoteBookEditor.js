import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
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
	const plainText = contentState.getPlainText();
    //const plainText = contentState.getBlocksAsArray().map(block => block.getText());
    return {
      jsonStr,
      plainText
    };
  }
	

  handleSubmit(e) { //this deals with form submission
 
    const db = firebase.database();
    db.ref("notebook/"+window.key+"/text").set(e);
   
    
  }

	handleLoad(content) {
                {/*LOAD CURRENTLY NOT WORKING */}
		console.log("clicked");
	        const db = firebase.database().ref().child("notebook").child(window.key).child("text");
		db.on('value',(snapshot) => {
		let string1 = snapshot.val();
                const string2 = JSON.parse(string1);
		const string3 = convertFromRaw(string2);
                console.log(string3);
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
		
		 	{/*THIS IS DEBUG JSON AND PLAIN TEXT
			//<p id="json"> JSON: {this.contentState.jsonStr}</p>
			//<p id="plaintext"> Plain Text: {this.contentState.plainText}</p>
		    SAVE AND LOAD BUTTONS*/}
	
			
			<button type="button" id="load" onClick={this.handleLoad.bind(this)}>Load</button>
			<button type="button" id="submit" onClick={this.handleSubmit.bind(this, this.contentState.jsonStr)}>Save</button>

	  	</div>
	  }
	</div>
	
    );
  } 
}

export default NoteBookEditor;

