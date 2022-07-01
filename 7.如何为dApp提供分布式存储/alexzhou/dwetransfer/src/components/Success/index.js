import { Alert, Card, Button } from "react-bootstrap";

export const Success = ({cids, setCids, setSendingState}) => {
    setSendingState(false);

    const onGoBack = () => {
        setCids([]);
    } 

    return (
        <div>
            <Card.Text>
                <Alert variant='light'> 
                    Files have been sent to Web3.Storage & IPFS successfully
                </Alert>
                <ul>
                    {cids.map(function(path, index) {
                        return <li><a href={"https://" + path + ".ipfs.dweb.link" } >https://{path}.ipfs.dweb.link</a></li>
                    })}
                </ul>
                <Button variant='success' onClick={onGoBack}>Go Back</Button>
            </Card.Text>
        </div>
    )
}