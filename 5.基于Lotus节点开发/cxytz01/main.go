package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/filecoin-project/go-address"
	jsonrpc "github.com/filecoin-project/go-jsonrpc"
	lotusapi "github.com/filecoin-project/lotus/api"
)

const (
	// authToken = "<value found in ~/.lotus/token>"
	authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.hdPGC5HSDDWOQ8YJ0jwNZZGdzsaF2ZrXSuWLv63LueY"
	addr      = "127.0.0.1:1234"
)

var (
	headers   = http.Header{"Authorization": []string{"Bearer " + authToken}}
	apiClient lotusapi.FullNodeStruct
)

func init() {
	_, err := jsonrpc.NewMergeClient(context.Background(), "ws://"+addr+"/rpc/v0", "Filecoin", []interface{}{&apiClient.Internal, &apiClient.CommonStruct.Internal}, headers)
	if err != nil {
		log.Fatalf("connecting with lotus failed: %s", err)
	}
}

func main() {
	// Now you can call any API you're interested in.
	tipset, err := apiClient.ChainHead(context.Background())
	if err != nil {
		log.Fatalf("calling chain head: %s", err)
	}
	fmt.Printf("Current chain head is: %v\n", tipset.String())

	// -------------------store file-----------------------------------
	storeFile("/home/ubuntu/rl4.webp")

	// -------------------wallet-----------------------------------
	// newWallet()
	// WalletBalance("t1ulqdr6x4pun6yktl5uh74fxg746sqgiwffy5p2y")
	// transferFIL("t1ulqdr6x4pun6yktl5uh74fxg746sqgiwffy5p2y", "t1hq3fbn3yac62lwzemppu5dw2l3yiss5j3r7jx4a", 9223372036854775807 /*是int64最大的值了*/)
}

func string2Address(ID string) address.Address {
	result, err := json.Marshal(ID)
	if err != nil {
		log.Fatalf("string2Address: %v err: %v\n", ID, err)
	}

	addr := address.Address{}
	if err = addr.UnmarshalJSON(result); err != nil {
		log.Fatalf("string2Address: %v error: %v\n", ID, err)
	}

	return addr
}
