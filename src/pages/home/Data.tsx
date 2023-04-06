const DocumentData = [
  {
    title: 'ERC-20',
    code: `// Issue your own token on Bitcoin
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import “@openzeppelin/contracts/token/ERC20/ERC20.sol”;

contract Bitswap is ERC20 {
    constructor(uint256 initialSupply) ERC20(“Bitswap”, “BIT”) {
        _mint(msg.sender, initialSupply);
    }
}`,
  },
  {
    title: 'ERC-721',
    code: `// Create an NFT collection on Bitcoin
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import “@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol”;

contract CryptoWizards is ERC721URIStorage {
  
    constructor() ERC721(“CryptoWizards”, “WIZ”) {}

    function safeMint(address to, uint256 tokenId, string memory uri) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}`,
  },
  {
    title: 'BNS',
    code: `// Build the Bitcoin Name System
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BNS is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(bytes => uint256) public registry;
    mapping(bytes => bool) public registered;

    mapping(uint256 => address) public resolver;

    constructor() ERC721("Bitcoin Name System", "BNS") {}

    function register(address owner, bytes memory name) 
        public 
        returns (uint256) 
    {
        require(!registered[name]);

        uint256 id = _tokenIds.current();
        _mint(owner, id);
        registry[name] = id;
        registered[name] = true;
        resolver[id] = owner;

        _tokenIds.increment();
        return id;
    }

    function map(uint256 tokenId, address to) public {
        require(msg.sender == ownerOf(tokenId));
        resolver[tokenId] = to;
    }
}
`,
  },
  {
    title: 'BFS',
    code: `// Build the Bitcoin File System
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BFS {
    mapping(address => mapping(string => mapping(uint256 => bytes))) public dataStorage;
    mapping(address => mapping(string => uint256)) public chunks; // max chunk index

    function store(string memory filename, uint256 chunkIndex, bytes memory _data) 
        external 
    {
        dataStorage[msg.sender][filename][chunkIndex] = _data;
        if (chunks[msg.sender][filename] < chunkIndex) {
          chunks[msg.sender][filename] = chunkIndex;
        }
    }

    function load(address addr, string memory filename, uint256 chunkIndex)
        public
        view 
        returns (bytes memory, int256) 
    {
        uint256 temp = chunkIndex + 1;
        int256 nextChunk = (temp > chunks[addr][filename]) ? -1 : int256(temp);
        return (dataStorage[addr][filename][chunkIndex], nextChunk);
    }

    function count(address addr, string memory filename)
        public
        view
        returns (uint256) 
    {
        return chunks[addr][filename];
    }
}`,
  },
];

const FaqData = [
  {
    question: 'What is Trustless Computer?',
    answer:
      'Trustless Computer was created to make Bitcoin as generalized as possible — usable for far more than just a currency. It enables developers to create DAO, DEX, NFT, token, auction, lending, data storage, and many other use cases on Bitcoin.',
  },
  {
    question: 'What programming language does Trustless Computer use?',
    answer:
      'Solidity. If you are experienced with developing smart contracts on Ethereum, you’ll find it home here. You can use the same development environment, such as Hardhat and Truffle, and the same wallet, such as MetaMask.',
  },
  {
    question: 'Is Trustless Computer Layer 1 or Layer 2?',
    answer:
      'Trustless Computer is a Layer 1 protocol. Trustless Computer stores smart contracts and transactions directly on the Bitcoin network.',
  },
  {
    question: 'How is Trustless Computer different from Ordinals?',
    answer:
      'While both Ordinals and Trustless Computer are Layer 1 protocols, they are entirely different. Ordinals lets users inscribe content like images and texts onto Bitcoin. Trustless Protocol allows developers to deploy smart contracts and decentralized applications onto Bitcoin.',
  },
  {
    question: 'What is the transaction size limit?',
    answer:
      '400 kB. In theory, the transaction size could go up to the entire Bitcoin block of 4 MB. But we recommend staying under 400 kB.',
  },
  {
    question: 'What is TC?',
    answer:
      'TC is the currency of Trustless Computer. You can use it in decentralized applications running on Bitcoin.',
  },
  {
    question: 'What is the block gas limit?',
    answer: '2.5 billion TC.',
  },
  {
    question: 'What is the chain id?',
    answer: '22213',
  },
];

export { DocumentData, FaqData };
