import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CountUp from 'react-countup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MintPage.css';

const contractABI = [{
    "inputs": [
        {
            "internalType": "string",
            "name": "_baseURI",
            "type": "string"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "sender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "approver",
            "type": "address"
        }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
        }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "ApprovalForAll",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "_fromTokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "_toTokenId",
            "type": "uint256"
        }
    ],
    "name": "BatchMetadataUpdate",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
        }
    ],
    "name": "MetadataUpdate",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "baseURI",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "getApproved",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }
    ],
    "name": "isApprovedForAll",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "maxSupply",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "name": "mintPrice",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "name",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "ownerOf",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }
    ],
    "name": "supportsInterface",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "tokenURI",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];
const contractAddress = '0x26B24bE02620214995911a5123e964EF7A962a79';

// PUBLIC RPC (read-only, no wallet needed)
const readOnlyProvider = new ethers.JsonRpcProvider('https://etc.etcdesktop.com'); // Replace if needed

const MintPage = () => {
  const [soldOut, setSoldOut] = useState(false);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [mintPrice, setMintPrice] = useState('0');
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const backgroundUrl = 'https://loud-chocolate-cattle.myfilebase.com/ipfs/QmR5b1whp3Vdxz87JaVNuBvcSC7PJcCvdH5hZjRRutFA62';
  const comicCover = 'https://loud-chocolate-cattle.myfilebase.com/ipfs/QmWy2Mv16CDiXcFJnTxqLWfdEbgKf7bVC54pcKP7HpkgV9/0.png';

  // Load basic status (before wallet connection)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const readOnlyContract = new ethers.Contract(contractAddress, contractABI, readOnlyProvider);
        const [price, total, max] = await Promise.all([
          readOnlyContract.mintPrice(),
          readOnlyContract.totalSupply(),
          readOnlyContract.maxSupply(),
        ]);
        setMintPrice(ethers.formatEther(price));
        setTotalSupply(Number(total));
        setMaxSupply(Number(max));
        setSoldOut(Number(total) >= Number(max));
      } catch (err) {
        console.error('Error fetching public mint status:', err);
      }
    };

    fetchStatus();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        setAccount(userAddress);

        const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(connectedContract);

        const balance = await connectedContract.balanceOf(userAddress);
        setIsOwner(balance > 0n);
      } catch (err) {
        console.error('Wallet connection error:', err);
        toast.error('Wallet connection failed');
      }
    } else {
      toast.error('MetaMask is not installed');
    }
  };

  const checkOwnership = async (userAddress) => {
    if (contract && userAddress) {
      try {
        const balance = await contract.balanceOf(userAddress);
        setIsOwner(balance > 0n);
      } catch (err) {
        console.error('Ownership check error:', err);
      }
    }
  };

  const mintNFT = async () => {
    if (contract && account) {
      try {
        setMinting(true);
        const tx = await contract.mint({ value: ethers.parseEther(mintPrice) });
        await tx.wait();
        const updatedSupply = await contract.totalSupply();
        setTotalSupply(Number(updatedSupply));
        setSoldOut(Number(updatedSupply) >= maxSupply);
        setMintSuccess(true);
        checkOwnership(account);
        toast.success('Mint successful! 🎉');
      } catch (err) {
        console.error('Mint error:', err);

        const errString = err?.toString()?.toLowerCase();
        if (errString.includes('insufficient funds') || errString.includes('revert')) {
          toast.error('Not enough ETC, please fund your wallet and try again');
        } else {
          toast.error('Mint failed, try again later');
        }
      } finally {
        setMinting(false);
      }
    }
  };

  return (
    <>
      <div
        className="mint-container"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '2rem',
          color: 'white',
          position: 'relative',
        }}
      >
        <div className="wallet-connection">
          <span
            className={`status-dot ${account ? 'connected' : 'disconnected'}`}
            title={account ? 'Wallet Connected' : 'Wallet Disconnected'}
          ></span>
          <button className="connect-btn" onClick={connectWallet}>
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>

        <div className="mint-box">
          <div className="mint-stats">
            <span>Total Minted:</span>
            <CountUp end={totalSupply} duration={2} /> / {maxSupply}
          </div>

          {account && (
            <>
              <button
                className="mint-btn"
                onClick={mintNFT}
                disabled={minting || soldOut}
              >
                {soldOut ? 'Sold Out' : minting ? 'Minting...' : `Mint for ${mintPrice} ETC`}
              </button>

              {isOwner && (
                <>
                  <a
                    className="read-comic-btn"
                    href="/reader"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📖 Read Comic Book
                  </a>
                  {!mintSuccess && (
                    <p className="ownership-message">You already own this comic book NFT.</p>
                  )}
                </>
              )}
            </>
          )}

          <div className="social-checks">
            <label>
              <input type="checkbox" />
              <a href="https://x.com/ZeusPayETC" target="_blank" rel="noreferrer">
                Follow on X
              </a>
            </label>
            <label>
              <input type="checkbox" />
              <a href="https://t.me/+ahBGWbW09kxkYmI0" target="_blank" rel="noreferrer">
                Join Telegram
              </a>
            </label>
          </div>
        </div>

        <div className="comic-display">
          <img src={comicCover} alt="Comic Cover" />
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </>
  );
};

export default MintPage;