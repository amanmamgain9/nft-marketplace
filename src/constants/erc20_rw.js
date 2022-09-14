import { ethers } from "ethers";

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function approve(address spender, uint amount) external returns (bool)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    "function transferFrom(address sender, address recipient,uint amount) external returns (bool)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
    
];

// This can be an address or an ENS name
const address = "0x1f73f0dd3a2e3b4c63f329a6967ed54063938fc2";

// Read-Only; By connecting to a Provider, allows:
// - Any constant function
// - Querying Filters
// - Populating Unsigned Transactions for non-constant methods
// - Estimating Gas for non-constant (as an anonymous sender)
// - Static Calling non-constant methods (as anonymous sender)
const erc20 = new ethers.Contract(address, abi);

// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions
const erc20_rw = new ethers.Contract(address, abi);
export {erc20_rw}
