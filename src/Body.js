import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LearnMore from './LearnMore';

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <h1>noteBK</h1>
            <p>Powered by LiveSync</p>
            <LearnMore />
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col md={4}>
              <h2>Notes</h2>
              <p>Create notes with speed and ease thanks to the simplified user interface.
				You'll never forget a thing with noteBK.
				</p>
              <p><Button>Want to know more?</Button></p>
            </Col>
            <Col md={4}>
              <h2>Reminders</h2>
              <p>Set a reminder for when you can't afford to be late to a meeting, appointment
			or even a party. With LiveSync technology, you can even share your reminders with colleagues, friends or family.</p>
              <p><Button>Want to know more?</Button></p>
            </Col>
            <Col md={4}>
              <h2>To-do Lists</h2>
              <p>Have you ever went shopping and forgot something you needed to buy? Never waste time again
			wth noteBK's To-do lists that can be synched with anyone you want.</p>
              <p><Button>Want to know more?</Button></p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
