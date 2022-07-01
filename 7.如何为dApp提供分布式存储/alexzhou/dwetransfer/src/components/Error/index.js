import { Alert, Card, Button } from "react-bootstrap";

export const Error  = ({setIpfsError, setSendingState}) => {     
    setSendingState(false);

    const onDismiss = () => {
        setIpfsError(false);
    }

    return (
    <Card.Text>
        <br/>
        <Alert variant='danger'>
            Failed to upload to IPFS via Web3.Storage. Make sure you have selected a file to upload.
        </Alert>
        <Button variant='danger' onClick={onDismiss}>dismiss</Button>
    </Card.Text>
)
}