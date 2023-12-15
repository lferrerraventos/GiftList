const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
var args = process.argv.slice(2);

if(args.length === 0) {
  throw new Error("You have to provide a name");
}

const name = args.join(" ");

const merkleTree = new MerkleTree(niceList);

console.log("Hi " + name);

const index = niceList.findIndex((n) => n === name);
const proof = merkleTree.getProof(index);

async function main() {
  if (index !== -1) {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      name,
    });
    console.log(gift);
  } else {
    console.log("Error: You are not on the list :(");
  }
}

main();