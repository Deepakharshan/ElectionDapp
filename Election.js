//In this project i'll used React.js, ethers.js library instead of using web3.js :

import {React, useState} from "react";
import "./App.css";
import {ethers} from "ethers"
export default function App(){

    // Metamask wallet based functions are here:
    const [wallet, setWallet] = useState("Connect");
    const [Error, setErrormsg] = useState(null);
    
    //Contract abi & address
    const address = "Your contract address";
    const abi = [
        {
            "inputs": [],
            "name": "candidateOne",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidateTwo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "checkVote",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    //Contract based functions are here:
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)
    const [voteone, setVoteOne] = useState("Vote")
    const [votetwo , setVoteTwo] = useState("Vote")
    const [DefaultCheck, setValue] = useState("Check")
    

    //Function to connect Wallet:
    const Wallet = () =>{
        if(window.ethereum){
            window.ethereum.request({method:"eth_requestAccounts"});
            setWallet("Connected");
        }
        else{
           setErrormsg("Please Install Metamsk")
        }
        etherjs()
    }
    
    //Function to Create a provider and signer...
    const etherjs =() =>{
      const Provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(Provider)

      const Signer = Provider.getSigner()
      setSigner(Signer)
        
      const Contract = new ethers.Contract(address, abi, Signer)
      setContract(Contract)
    }

    //Function for Voting the First Candidate
    const VoteOne = () =>{
        contract.candidateOne()
        setVoteOne("Voted")
    }
     
    // Function for Voting the Second Candidate
    const VoteTwo = () =>{
        contract.candidateTwo()
        setVoteTwo("Voted")
    }
    

    //Function for Checking if you voted are not
    const GoCheck = async() =>{
        const result = await contract.checkVote()
        
        if(result == true){
            setValue("Done")
        }else if(result == false){
            setValue("Not Voted")
        }
    }
    return(
        <div>
            <div className = "App">
                <div className = "Box">
                <h1 className = "Heading">Election</h1>
                </div>
                <button className = "wallet" onClick = {Wallet}>{wallet}</button>
                <h1 className = "Candi">Candidates</h1>
                <h2 className = "Vote">Votes</h2>
                <div>
                 <div className = "Ellipse">
                     <h1 className = "One">1</h1>
                 </div>
                  <button className = "VoteOne" onClick = {VoteOne}>{voteone}</button>
                </div>
                <div>
                    <div className = "EllipseTwo">
                     <h1 className = "Two">2</h1>
                    </div>
                    <div>
                     <button className = "VoteTwo" onClick = {VoteTwo}>{votetwo}</button>
                    </div>
                </div>
                <button className = "CheckBox" onClick = {GoCheck}>{DefaultCheck}</button>
            </div>
        </div>
    )
}
