import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as s from "./styles/globalStyles";
import _color from "./assets/images/bg/335396.jpg";
import "./assets/css/bootstrap.css";
import Web3 from "web3";
import NftContract from "./contracts/Nft.json";

function App() {
  const [loading, setLoading] = useState(false);
  const [authorised, setAuthorised] = useState(false);
  const [minted, setMinted] = useState(false);
  const [to,setTo] =useState("");
  
  const connect = async() => {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const nft = new web3.eth.Contract(
              NftContract ,
              "0x828cf6F67416E90c7A06C9b8F0B0e27bc1601d39"
            );
            console.log(accounts);
            console.log(nft);
            setAuthorised(true);
            
            // Add listeners start
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
        } catch (err) {
          console.log("Something went wrong.");
        }
      } else {
        console.log("Install Metamask.");
      }
  };

  const mint = async()=>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    let web3 = new Web3(window.ethereum);
    const nft = new web3.eth.Contract(
      NftContract ,
      "0x828cf6F67416E90c7A06C9b8F0B0e27bc1601d39"
    );
      await nft.methods.publicMint(to).send(
        {
          from:accounts[0],
          value:1
        }
      )
      setMinted(true);
  
  }
  
  return (
    <s.Screen image={_color}>
      { !authorised ? (
        <div>
          
         <button
            className="btn btn-warning fw-bold w-100 btn-lg mt-5"
            onClick={(e) => {
              e.preventDefault();
              connect();
            }}
          >
            CONNECT YOUR WALLET
          </button>
          </div>
      ) : (!minted) ?(
        <div className="p-3">
          <div className="container text-center">
            <div className="text-white h5 my-5 text-center ">
              Mint NFT by click of button
            </div>

            <input
              type="text"
              className="bg-dark w-100 p-3 mb-3 text-white form-control rounded"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Address to mint the NFT"
            />
            <button
              className="btn btn-warning fw-bold w-100 btn-lg"
              disabled={loading ? 1 : 0}
              onClick={(e) => {
                e.preventDefault();
                mint();
              }}
            >
             MINT 
            </button>
          </div>
        </div>
      )
      : 
     (<div className="badge text-secondary py-4 text-center ">
     <h3 className="fw-bold text-white d-block">Nft minted successfully </h3>
     </div> 
     )
          }

      <div className="badge text-secondary py-4 text-center ">
       <h5 className="fw-bold text-white">Built by{" "}</h5> 
        <h4 className="fw-bold text-white d-block">
          Surbhit Agrawal
        </h4>
      </div>
    </s.Screen>
  );
}
export default App;

