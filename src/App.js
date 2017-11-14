import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';
import {Button} from 'react-bootstrap';
import homePageImage1 from './jumbotron.jpg';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      topic: '',
      items: [],
      user: null //add this line in here for the user information
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>noteBk</h1>

            {this.state.user
              ? <Button className="headerButton" onClick={this.logout}>Log Out</Button>
              : <Button className="headerButton" onClick={this.login}>Log In/Register</Button>
}
          </div>
        </header>
        {this.state.user
          ? <div>
              <div className='user-profile'>
                <img src={this.state.user.photoURL}/>
              </div>
              <div className='container'>
                <section className='add-item'>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email}/>
                    <input type="text" name="topic" placeholder="Name of topic?" onChange ={this.handleChange} value={this.state.topic}/>
                    <button>Create NoteBk</button>
                  </form>
                </section>
                <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (item.user === this.state.user.displayName || item.user === this.state.user.email
                          ? <li key={item.id}>
                              <h3>{item.topic}</h3>
                              <h4>
                                Author: {item.user}
                              </h4>
                              <Button id="button1">View NoteBk</Button>
                              <Button id="button2" onClick={() => this.removeItem(item.id)}>Delete NoteBk</Button>
                            </li>
                          : null)
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          : <div className='wrapper'>
            <img src={homePageImage1} className="images" />
            <Grid>
              <Row>
                <Col md={4}>
                  <h2>Notes</h2>
                  <p>Create notes quickly and easily thanks to the simplified UI</p>
            <p>You will never forget a thing with noteBK.</p>
                </Col>
                <Col md={4}>
                  <h2>Reminders</h2>
                  <p>Set a reminder for when you cannot afford to be late to a meeting, appointment
          or even a party. With LiveSync technology, you can even share your reminders with colleagues, friends or family.</p>
                </Col>
                <Col md={4}>
                  <h2>To-do Lists</h2>
                  <p>Have you ever went shopping and forgot something you needed to buy? Never waste time again
          wth noteBKs To-do lists that can be synched with anyone you want.</p>
                </Col>
              </Row>
            </Grid>
          </div>
}
      </div>
    );
  }
  handleChange(e) { //this deals with form changes
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }
  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({user});
    });
  }
  handleSubmit(e) { //this deals with form submission
    e.preventDefault();
    const NoteBookStack = firebase.database().ref('notebook');
    const item = {
      topic: this.state.topic,
      user: this.state.user.displayName || this.state.user.email
    }
    NoteBookStack.push(item);
    this.setState({topic: '', username: ''});
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
    });
    const NoteBookStack = firebase.database().ref('notebook');
    NoteBookStack.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({id: item, topic: items[item].topic, user: items[item].user});
      }
      this.setState({items: newState});
    });
  }
  removeItem(itemId) {
    const noteTopic = firebase.database().ref(`/notebook/${itemId}`);
    noteTopic.remove();
  }

}

export default App;
