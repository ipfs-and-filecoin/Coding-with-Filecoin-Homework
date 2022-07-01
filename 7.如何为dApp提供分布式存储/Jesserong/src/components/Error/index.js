import { Alert, Button } from "react-bootstrap";
import { useEffect } from "react";

export const Error  = ({setIpfsError, setSendingState}) => {  

    useEffect(() => {
        setSendingState(false)
    },[setSendingState])

    const onDismiss = () => {
        setIpfsError(false);
    }

    return (
        <div>
            <br/>
            <Alert variant='danger'>
                Failed to upload to IPFS via Web3.Storage. Make sure you have selected a file to upload.
            </Alert>
            <Button variant='danger' onClick={onDismiss} >
                dismiss
            </Button>
        </div>
    )
}