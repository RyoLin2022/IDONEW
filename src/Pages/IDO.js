import React, { useState } from 'react';
import './CSS/IDO.css';
import { savedAcc } from '../App';
import { CopyToClipboard } from 'react-copy-to-clipboard';

let currentAccount = null;
let refAccount = null;
let refLink = null;
let Refs = null;
let isChainOKT = null;
function IDO() {

  const [copied, setCopied] = useState(false);
  currentAccount = savedAcc;
  GetRef();
  GenerateLink();
  let IDOContract = "0x5E2e5b831a1e2CC458123e0b79d17b7c2d5C6510";

  Joined();
  refs();

  async function GetRef() {
    let fullText = window.location.href;
    if (fullText.includes("tokenpocket"));
    fullText = fullText.substring(0, fullText.length - 23);

    let length = fullText.length;

    if (length < 60)
      refAccount = "0x0000000000000000000000000000000000000000";
    else
      refAccount = fullText.substring(length - 42, length);
  }


  /*------------------Here's the Link Generation-----------------*/
  /*------------------Here's the Link Generation-----------------*/
  /*------------------Here's the Link Generation-----------------*/
  async function GenerateLink() {
    let link = window.location.href;
    if (link.includes("tokenpocket"))
      link = link.substring(0, link.length - 23);

    if (link.length > 60)
      link = link.substring(0, link.length - 42) + currentAccount;
    else
      link = link + "?invitedBy=" + currentAccount;
    refLink = link;
  }

  async function switchEthereumChain() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x42' }],
      }).then(isChainOKT = true)
    } catch (e) {
      isChainOKT = false;
      alert("Please change the chain to OKC");
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x42',
                chainName: 'Smart Chain',
                nativeCurrency: {
                  name: 'OKC Mainnet',
                  symbol: 'OKT', // 2-6 characters long
                  decimals: 18
                },
                blockExplorerUrls: ['https://www.oklink.com/okexchain/'],
                rpcUrls: ['https://exchainrpc.okex.org/'],
              },
            ],
          });
        }
        catch (addError) {
          alert("Please change the chain to OKC");
          console.log(addError);
        }
      }
    }
  }

  async function makeIDO() {
    //0x82de721e0000000000000000000000001b878663d61ed1aa1fc4caffe32cc12458ba13de
      await switchEthereumChain();
      
    if (Refs < 1) {
      if (isChainOKT === true) {

        let inputData = "0x82de721e" + "000000000000000000000000"
          + refAccount.substring(2, refAccount.length);

        let inputGasPrice = await window.ethereum.request({
          method: "eth_gasPrice"
        });

        let params = [
          {
            from: currentAccount,
            to: IDOContract,
            gas: Number(300000).toString(16), // 30400
            gasPrice: inputGasPrice, // 
            value: Number(10000000000000).toString(16),
            data: inputData,
          },
        ]

        let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
          console.log(err);
        })

        setTimeout(function () {
          Joined();
          console.log("The first log delay 10 second");
        }, 20000);
      }
    } else {
      alert("You can't join twice!!");
    }
  }


  async function claimIDO() {
    let inputData = "0x4451d89f";
    let inputGasPrice = await window.ethereum.request({
      method: "eth_gasPrice"
    });

    let params = [
      {
        from: currentAccount,
        to: IDOContract,
        gas: Number(300000).toString(16), // 30400
        gasPrice: inputGasPrice, // 
        value: 0,
        data: inputData,
      },
    ]

    //Result is the transaction hash
    let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })

    setTimeout(function () {
      console.log("The first log delay 10 second");
    }, 20000);
  }

  async function Joined() {
    let inputData = "0x3421a177000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let JoinedOrNot = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: IDOContract,
        data: inputData,
        //BalanceOf:0x70a08231
        //(account):0000000000000000000000006b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b
      },
        "latest"
      ]
    });
    let TF = parseInt(JoinedOrNot);
    Refs = TF;
    var text;
    if (TF === 1)
      text = "Joined";
    else
      text = "Not Joined";
    document.getElementById("IDOJOIN").innerText = text;
  }

  async function refs() {
    let inputData = "0xa7bb8198000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let JoinedOrNot = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: IDOContract,
        data: inputData,
        //BalanceOf:0x70a08231
        //(account):0000000000000000000000006b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b
      },
        "latest"
      ]
    });
    let REFS = parseInt(JoinedOrNot);
    document.getElementById("InvitedAmount").innerText = REFS;
  }

  function alertCopied() {
    alert("Invitation link has been copied!!")
  }

  return (

    <div className='IDO'>
      <div className="IDOSection">
        <div className="IDOSec1">
          <table id="IDOTable">

            <thead id="th1">
              IDO
            </thead>
            <tbody>
              <tr id="tr0">Dashboard</tr>
              <tr id="tr1">
                <td id="td1">IDO</td>
                <td id="IDOJOIN"></td>
              </tr>

              <tr id="tr2">
                <td id="td2">Invitation</td>
                <td id="InvitedAmount">0</td>
              </tr>
            </tbody>

          </table>
        </div>
        <div className="IDOSec3">
          <button id="makeIDO" onClick={makeIDO}>Join IDO</button>
        </div>
        <div className="IDOSec4">
          <CopyToClipboard text={refLink} onCopy={() => setCopied(true)}>
            <button id="inviteLink" onClick={alertCopied}>
              Copy Invite Link
            </button>
          </CopyToClipboard>
        </div>
        <div className="IDOSec5">
          <button id="claimIDO" onClick={claimIDO}>Claim</button>
        </div>
      </div>
    </div>
  )
}

export default IDO







  // async function sendTransaction() {

  //   let params = [
  //     {
  //       from: currentAccount,
  //       to: "0x60e21c1C75E60a966734B4Dd0FE1D3ac7484F00A",
  //       gas: Number(30400).toString(16), // 30400
  //       gasPrice: Number(10000000000).toString(16), // 10000000000
  //       value: Number(1000000000000000).toString(16), // (0.001 ethers)
  //     },
  //   ]

  //   //Result is the transaction hash
  //   let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
  //     console.log(err);
  //   })

  //   if (result) {
  //     var TXSent = document.getElementById("transaction-btn");
  //     TXSent.innerText = "Transaction has been sent";
  //     console.log(result);
  //   }
  //   setTimeout(function () {
  //     console.log("The first log delay 10 second");
  //   }, 20000);
  // }

  // let contractAddress = "0x6b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b";    //Modify Contract Address here!!
  // async function ContractEthBalance() {
  //   let accBalance = await window.ethereum.request({
  //     method: "eth_getBalance",
  //     params:
  //       [contractAddress, 'latest']
  //   });
  //   var balanceDEC = Number(accBalance).toString(10);
  //   console.log(balanceDEC);
  //   var inWeiBal = balanceDEC.length;
  //   var balanceBtn = document.getElementById("test-btn");

  //   var str = Math.pow(10, (inWeiBal - 22));
  //   var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
  //   balanceBtn.innerText = rounded + " OKT";
  // }
