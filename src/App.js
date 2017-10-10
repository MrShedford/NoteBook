import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';

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
            <h1>NoteBook</h1>
            {this.state.user
              ? <button onClick={this.logout}>Log Out</button>
              : <button onClick={this.login}>Log In</button>
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
                    <button>Add to Stack</button>
                  </form>
                </section>
                <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>{item.topic}</h3>
                            <p>brought by: {item.user}
                              {item.user === this.state.user.displayName || item.user === this.state.user.email
                                ? <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                : null}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          : <div className='wrapper'>
            <p>You must be logged in to see the potluck list and submit to it.</p>
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
