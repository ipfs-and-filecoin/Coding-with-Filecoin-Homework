import { Alert, Button } from "react-bootstrap";
import { useEffect } from "react";

export const Success = ({cids, setCids, setSendingState}) => {  

    useEffect(() => {
        setSendingState(false)
    },[setSendingState])

    const onGoBack = () => {
        setCids([]);
    } 

    const openFile = (e) => {
        const href = e.target.dataset.href;
        window.open(href);
    }

    return (
        <div>
            <Alert variant='light'> 
                Files have been sent to Web3.Storage & IPFS successfully
            </Alert>
            <ul className="ulList"> 
                {cids.map(function(path, index) {
                    return <li key={index} onClick={openFile} data-href={"https://" + path + ".ipfs.dweb.link" }>https://{path}.ipfs.dweb.link</li>
                })}
            </ul>
            <Button variant='success' onClick={onGoBack}>
                Go Back
            </Button>
        </div>
    )
}