import React from "react";
import './index.css';
import { Alert, Button, Card, Form, Spinner, ListGroup } from "react-bootstrap";
import { Web3Storage } from "web3.storage";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'prepare',
      cid: '',
    };

    this.fileInput = React.createRef()
    this.handleBack = this.handleBack.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  componentDidMount() {
    // console.log(process.env.NODE_ENV, process.env.REACT_APP_API_TOKEN)
  }

  handleBack(e) {
    e.preventDefault();
    this.setState({
      status: 'prepare'
    })
  }

  handleSelect(e) {
    console.log(e)
  }

  handleSend(e) {
    console.log('kanaloa');
    e.preventDefault();

    // this.setState({
    //   status: 'pending'
    // })
    // setTimeout(()=>{
    //   this.setState({
    //     status: 'finished'
    //   })
    // }, 5000)
    const token = process.env.REACT_APP_API_TOKEN
    const storage = new Web3Storage({ token })
    // const data = new FormData();
    // data.append('file', this.fileInput.current.files[0]);
    const files = this.fileInput.current.files;
    console.log(`Uploading ${files.length} files`)
    this.setState({ status: 'pending' })
    storage.put(files).then(cid => {
      console.log('Content added with CID:', cid)
      this.setState({ cid: cid, status: 'finished' })
    }).catch(err => {
      console.err(err)
    })
  }

  handleStop(e) {
    e.preventDefault();
    // TODO
  }

  render() {
    return (
      <div className="main" style={{paddingTop: '1px'}}>
        <Card style={{ width: '24rem', backgroundColor: 'white', margin: '2rem'}}>
          <Card.Img variant="top" src="carol.png" />
          <Card.Body>
            <Card.Title>Kalanoa in the Web 3.0</Card.Title>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text> */}
            {this.state.status === 'prepare' && <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  {/* <Form.Label>Default file input example</Form.Label> */}
                  <Form.Control type="file" onChange={this.handleSelect} ref={this.fileInput}/>
                </Form.Group>
                <Button variant="primary" onClick={this.handleSend}>Send via IPFS</Button>
            </Form>}
            {this.state.status === 'pending' && <div>
              <Alert style={{color: '#333', fontSize: '16px', padding: '1rem 0rem 0rem 0rem'}} key='light' variant='light'>
                Uploading to IPFS via Web3.Storage...
              </Alert>
              <Spinner animation="border" />{' '}
              <br />
              <Button style={{marginTop: '1rem'}} variant="danger" onClick={this.handleStop}>Stop</Button>
            </div>}
            {this.state.status === 'finished' && <div>
              <Alert style={{color: 'gray', fontSize: '16px', padding: '1rem 0rem 0rem', marginBottom: '0rem'}} key='light' variant='light'>
                Files have been send to Web3.Storage & IPFS successfully
              </Alert>
              <ListGroup as="ul">
                <ListGroup.Item as="li" style={{border: 'none', padding: '1rem 0.5rem 0rem'}}>
                  {/* <a style={{fontSize: '14px'}} href="https://bafybeidegclbs3ijzbklnelqw7zlshfy3ph44avkw3rhxm2u7ucjizsauq.ipfs.dweb.link">
                    https://bafybeidegclbs3ijzbklnelqw7zlshfy3ph44avkw3rhxm2u7ucjizsauq.ipfs.dweb.link
                  </a> */}
                  <a style={{fontSize: '14px'}} href={"https://" + this.state.cid + ".ipfs.dweb.link"}>
                    https://{this.state.cid}.ipfs.dweb.link
                  </a>
                </ListGroup.Item>
              </ListGroup>
              <Button style={{marginTop: '1rem'}} variant="success" onClick={this.handleBack}>Go Back</Button>
            </div>}
          </Card.Body>
        </Card>
      </div>
    )
  }
}