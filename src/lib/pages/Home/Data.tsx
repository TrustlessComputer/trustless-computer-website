const DocumentData = [
  {
    title: "BRC-20",
    code: `    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    contract MyERC20 is ERC20, ERC20Burnable, Ownable {
        constructor() ERC20("TestToken", "TTK") {
            _mint(msg.sender, 10000 * 10 ** decimals());
        }
    
        function mint(address to, uint256 amount) public onlyOwner {
            _mint(to, amount);
        }
    }`,
  },
  {
    title: "BRC-721",
    code: `    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    
    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
    import "@openzeppelin/contracts/access/AccessControl.sol";
    import "@openzeppelin/contracts/utils/Strings.sol";
    import "hardhat/console.sol";
    
    contract NFT is ERC721, ERC721URIStorage, AccessControl {
        bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
        address public fileStorage;
    
        constructor(address _store) ERC721("MyToken", "MTK") {
            fileStorage = _store;
            _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
            _grantRole(MINTER_ROLE, msg.sender);
        }
    
        function _baseURI() internal view override returns (string memory) {
            return string.concat("bfs://22213/", Strings.toHexString(address(fileStorage)), "/");
        }
    
        function safeMint(address to, uint256 tokenId, string memory uri)
            public
            onlyRole(MINTER_ROLE)
        {
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uri);
        }
    
        // The following functions are overrides required by Solidity.
    
        function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
            super._burn(tokenId);
        }
    
        function tokenURI(uint256 tokenId)
            public
            view
            override(ERC721, ERC721URIStorage)
            returns (string memory)
        {
            return super.tokenURI(tokenId);
        }
    
        function supportsInterface(bytes4 interfaceId)
            public
            view
            override(ERC721, AccessControl)
            returns (bool)
        {
            return super.supportsInterface(interfaceId);
        }
    }`,
  },
  {
    title: "Bitcoin File System",
    code: `    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    
    contract BFS {
      mapping(address => mapping(string => mapping(uint256 => bytes))) public dataStorage;
      mapping(address => mapping(string => uint256)) public chunks; // max chunk index
    
      function store(string memory filename, uint256 chunkIndex, bytes memory _data) 
      external {
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
    
      function count(address addr, string memory filename) public view returns (uint256) {
        return chunks[addr][filename];
      }
    
    }`,
  },
];

const FaqData = [
  {
    question: "What programming language does Trustless Computer use?",
    answer:
      "Solidity. If you are experienced with developing smart contracts on Ethereum, you’ll find it home here. You can use the same development environment, such as Truffle and Hardhat.",
  },
  {
    question: "Is Trustless Computer Layer 1 or Layer 2?",
    answer:
      "Layer 1. Unlike other Layer 2 protocols like Taro and Stacks, Trustless Computer is a Layer 1 protocol. Trustless Computer stores smart contracts and transactions directly on the Bitcoin network.",
  },
  {
    question: "How is Trustless Computer different from Ordinals?",
    answer:
      "While both Ordinals and Trustless Computer are Layer 1 protocols, they are entirely different. Ordinals lets users inscribe content like images and texts onto Bitcoin. Trustless Protocol allows developers to deploy smart contracts and users to use decentralized applications on Bitcoin.",
  },
  {
    question: "What is BVM?",
    answer:
      "Bitcoin Virtual Machine (BVM) is at the heart of Trustless Computer architecture. BVM is Turing-Complete. BVM enables developers to create decentralized applications for Bitcoin, such as DEX, lending, auction, and DAO.",
  },
  {
    question: "What is the transaction size limit?",
    answer:
      "400 kB. In theory, the transaction size could go up to the entire Bitcoin block of 4 MB. But we recommend staying under 400 kB.",
  },
  {
    question: "What is JUICE?",
    answer:
      "JUICE is the currency of Trustless Computer. You can use it in decentralized applications running on Bitcoin.",
  },
  {
    question: "What is the block gas limit?",
    answer: "2.5 billion JUICE.",
  },
  {
    question: "What is the chain id?",
    answer: "22213",
  },
];

export { DocumentData, FaqData };
