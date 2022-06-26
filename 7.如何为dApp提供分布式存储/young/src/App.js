import './App.css';
import { useState } from 'react';
import { FileUploader } from './compoenents/FileUploader';
import { Sending } from './compoenents/Sending';
import { Error } from './compoenents/Error';
import { Success } from './compoenents/Success';

import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/pop-open.png';
import Logo2 from './assets/pop-close.png'
import Background from './assets/background.jpg';


function App() {

  const [cids, setCids] = useState([]);
  const [ipfsError, setIpfsError] = useState(false);
  const [sending, setSendingState] = useState(false);

  return (
    <div className="App" style={{ backgroundImage: `url(${Background})` }}>
      <Container className="p-3">
          <Card style={{ width: '25rem', minHeight: '52.8rem'}}>
            { cids.length === 0 ? <Card.Img variant="top" src={Logo} /> : <Card.Img variant="top" src={Logo2} /> }
            <Card.Body>
              <Card.Title>
                WeTransfer in the Web 3.0
                </Card.Title>
              { (cids.length === 0) && (sending === false) ? <FileUploader setCids={setCids} setIpfsError={setIpfsError} setSendingState={setSendingState} /> :null }
              { cids.length !== 0 ? <Success cids={cids} setCids={setCids} setSendingState={setSendingState} /> : null }
              { sending ? <Sending setSendingState={setSendingState}/> : null }
              { ipfsError ? <Error setIpfsError={setIpfsError} setSendingState={setSendingState}/> : null }
            </Card.Body>
          </Card>
      </Container>
    </div>
  );
}

export default App;
