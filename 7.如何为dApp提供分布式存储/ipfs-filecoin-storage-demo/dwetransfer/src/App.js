import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { Success } from './components/Success';
import { Error } from './components/Error';
import { Sending } from './components/Sending';

import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/dwetransfer-logo.png';
import Background from './assets/background.jpg';

function App() {
  const [cids, setCids] = useState([]);
  const [ipfsError, setIpfsError] = useState(false);
  const [sending, setSendingState] = useState(false);

  return (
    <div className="App" style={{ backgroundImage: `url(${Background})` }}>
      <Container className="p-3">
        <Card style={{ width: '25rem', minHeight: '35rem' }}>
          <Card.Img variant="top" src={Logo} />
          <Card.Body>
            <Card.Title>
              WeTransfer in the Web 3.0
            </Card.Title>
            {(cids.length === 0) && (sending === false) ? <FileUploader setCids={setCids} setIpfsError={setIpfsError} setSendingState={setSendingState} /> : null}
            {cids.length !== 0 ? <Success cids={cids} setCids={setCids} setSendingState={setSendingState} /> : null}
            {sending ? <Sending setSendingState={setSendingState} /> : null}
            {ipfsError ? <Error setIpfsError={setIpfsError} setSendingState={setSendingState} /> : null}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;