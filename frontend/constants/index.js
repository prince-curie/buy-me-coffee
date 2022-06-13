export const network = "goerli";

export const goerliChainId = 5;

export const contractAddress = "0xa1BF4e097Af4fF0D2a1190d5Dd408E77a13BB409";

export const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"NewMemo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"NewOwner","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"buyCoffee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_length","type":"uint256"}],"name":"getMemos","outputs":[{"internalType":"string[]","name":"name","type":"string[]"},{"internalType":"string[]","name":"message","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMemosCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"setNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTips","outputs":[],"stateMutability":"nonpayable","type":"function"}]
