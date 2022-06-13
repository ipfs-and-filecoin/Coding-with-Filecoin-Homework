package main

import (
	"context"
	"fmt"
	"log"

	"github.com/filecoin-project/go-fil-markets/storagemarket"
	"github.com/filecoin-project/lotus/api"
	"github.com/filecoin-project/lotus/chain/types"
)

func storeFile(file string) {
	fmt.Printf("handling store with file: %v\n", file)

	var (
		err     error
		minerID = "t035577"
	)

	// 1. import data to lotus
	ir, err := apiClient.ClientImport(context.Background(), api.FileRef{Path: file, IsCAR: false})
	if err != nil {
		log.Fatalf("Import file err: %v\n", err)
	}
	fmt.Printf("import_result cid: %+v", ir.Root)

	// 2. query storage provider's offer for storing this file
	minerAddr := string2Address(minerID)
	qo, err := apiClient.ClientMinerQueryOffer(context.Background(), minerAddr, ir.Root, nil)
	if err != nil {
		log.Fatalf("miner query offer err: %v\n", err)
	}

	//log.Printf("%#v\n", qo)
	fmt.Printf("ir cid: %v, qo cid: %v\n", ir.Root.String(), qo.Root.String())

	// 3. start storage deal with SP
	if ir.Root.String() == qo.Root.String() {
		defaultWallet, err := apiClient.WalletDefaultAddress(context.Background())
		if err != nil {
			log.Fatalf("get default wallet err :%v\n", err)
		}
		fmt.Printf("default wallet address is: %v\n", defaultWallet.String())

		param := &api.StartDealParams{
			Data: &storagemarket.DataRef{
				TransferType: "graphsync",
				Root:         ir.Root,
			},

			Wallet:            defaultWallet,
			Miner:             minerAddr,
			EpochPrice:        types.NewInt(200000000),
			MinBlocksDuration: 518400,
			VerifiedDeal:      false,
		}

		dealCID, err := apiClient.ClientStartDeal(context.Background(), param)
		if err != nil {
			log.Fatalf("make storage deal err: %v\n", err)
		}
		fmt.Printf("deal cid: %v\n", dealCID.String())
	}
}
