import { Card, Button, Spinner } from "react-bootstrap";

export const Sending  = ({setCids}) => {     

    const onStop = () => {
        window.location.reload(false);
    }

    return (
    <Card.Text>
        <br/>
        <Card.Text>
            Uploading to IPFS via Web3.Storage...
        </Card.Text>
            
        <Card.Text>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Card.Text>

        <Button variant='danger' onClick={onStop}>Stop</Button>
    </Card.Text>
)
}