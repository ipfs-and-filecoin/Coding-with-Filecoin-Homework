import { Card, Button, Spinner } from "react-bootstrap";

export const Sending  = ({setSendingState}) => {     

    const onStop = () => {
        setSendingState(false);
        window.location.reload(false);
    }

    return (
        <div>
            <br />
            <Card.Text>
                Uploading to IPFS via Web3.Storage...
            </Card.Text>
                
            <div>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>

            <Button variant='danger' onClick={onStop} >
                Stop
            </Button>
        </div>
    )
}