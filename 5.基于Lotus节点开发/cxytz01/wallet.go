package main

import (
	"context"
	"fmt"
	"log"

	"github.com/filecoin-project/go-address"
	"github.com/filecoin-project/go-state-types/abi"
	"github.com/filecoin-project/lotus/api"
	"github.com/filecoin-project/lotus/chain/types"
)

func newWallet() address.Address {
	addr, err := apiClient.WalletNew(context.Background(), types.KTSecp256k1)
	if err != nil {
		log.Fatalf("create new wallet error: %v\n", err)
	}

	fmt.Printf("new wallet address is: %v\n", addr.String())
	return addr
}

func WalletBalance(addr string) {
	result, err := apiClient.WalletBalance(context.Background(), string2Address(addr))
	if err != nil {
		log.Fatalf("get wallet balance error: %v\n", err)
	}

	fmt.Printf("wallet: %v has balance: %v\n", addr, result)
}

func transferFIL(from, to string, value int64) {
	defaultWallet, err := apiClient.WalletDefaultAddress(context.Background())
	if err != nil {
		log.Fatalf("get default wallet err :%v\n", err)
	}
	fmt.Printf("default wallet address is: %v\n", defaultWallet.String())

	nonce, err := apiClient.MpoolGetNonce(context.Background(), defaultWallet)
	if err != nil {
		// https://documenter.getpostman.com/view/4872192/SWLh5mUd
		// IMPORTANT - if this is the first time wallet, this call will return an error. If the error contains "address not found", we assume the Nonce is 0, since no on-chain transactions reference this address.
		log.Printf("get nonce err :%v\n", err)
		nonce = 0
	}

	// https://docs.filecoin.io/reference/exchanges/#mpoolpushmessagehttpslotusfilecoiniodocsapisjson-rpcmpoolpushmessage
	// Method ID of 0 with null Params is a balance transfer transaction
	m := &types.Message{
		To:         string2Address(to),
		From:       string2Address(from),
		Nonce:      nonce,
		Value:      abi.NewTokenAmount(value),
		Method:     0,
		Params:     nil,
		GasLimit:   20000000,
		GasFeeCap:  abi.NewTokenAmount(1000),
		GasPremium: abi.NewTokenAmount(0),
	}

	//Used to estimate the gas used in an upcoming transaction.
	ir, err := apiClient.StateCall(context.Background(), m, types.EmptyTSK)
	if err != nil {
		// https://documenter.getpostman.com/view/4872192/SWLh5mUd
		// NOTE - this call also errors if the address you are attempting to send From has no Filecoin (or has not been referenced in any on-chain transactions).
		log.Printf("state call err: %v\n", err)
	} else {
		m.GasLimit = ir.Msg.GasLimit
		m.GasFeeCap = ir.Msg.GasFeeCap
		m.GasPremium = ir.Msg.GasPremium
		fmt.Printf("%v\n", ir)
	}

	singnedMessage, err := apiClient.WalletSignMessage(context.Background(), string2Address(from), m)
	if err != nil {
		log.Fatal("singn message error: %v\n", err)
	}

	cid, err := apiClient.MpoolPush(context.Background(), singnedMessage)
	if err != nil {
		log.Fatal("mpoolpush err: %v\n", err)
	}

	fmt.Printf("cid: %v\n", cid)
}

func transferFILWithAutoEstimation(from, to string, value int64) {
	defaultWallet, err := apiClient.WalletDefaultAddress(context.Background())
	if err != nil {
		log.Fatalf("get default wallet err :%v\n", err)
	}
	fmt.Printf("default wallet address is: %v\n", defaultWallet.String())

	m := &types.Message{
		To:       string2Address(to),
		From:     string2Address(from),
		Value:    abi.NewTokenAmount(value),
		Method:   0,
		Params:   nil,
		GasLimit: 20000000,
	}

	// https://lotus.filecoin.io/reference/lotus/mpool/#mpoolpushmessage
	// https://docs.filecoin.io/reference/exchanges/#mpoolpushmessagehttpslotusfilecoiniodocsapisjson-rpcmpoolpushmessage
	// 该接口存在问题，拿不到CID，但是上面链接的http方式可以拿到cid.
	signedMessage, err := apiClient.MpoolPushMessage(context.Background(), m, &api.MessageSendSpec{MaxFee: abi.NewTokenAmount(0)})
	if err != nil {
		log.Fatalf("mpool push message err :%v\n", err)
	}

	fmt.Printf("signed message: %v\n", signedMessage)
}
