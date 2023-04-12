import IcDiscord from '@/assets/icons/ic_discord_black.svg';
import IcTwitter from '@/assets/icons/ic_twitter_black.svg';
import IcWebsite from '@/assets/icons/ic_website_black.svg';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ICollection } from '@/interfaces/api/collection';
import React, { useState } from 'react';
import { Container } from './CollectionHeader.styled';
import { CDN_URL } from '@/configs';
import { TC_EXPLORER } from '@/constants/url';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import useMintChunks, { IMintChunksParams } from '@/hooks/contract-operations/nft/useMintChunks';
import useMintBatchChunks, { IMintBatchChunksParams } from '@/hooks/contract-operations/nft/useMintBatchChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { Transaction } from 'ethers';
import { toast } from 'react-hot-toast';
import { FileUploader } from 'react-drag-drop-files';
import { BLOCK_CHAIN_FILE_LIMIT, ERC721_SUPPORTED_EXTENSIONS, ZIP_EXTENSION } from '@/constants/file';
import { Buffer } from 'buffer';
import { fileToBase64, getFileExtensionByFileName, isERC721SupportedExt, readFileAsBuffer, unzipFile } from '@/utils';

interface ICollectionHeader {
  collection?: ICollection;
}

const CollectionHeader = (props: ICollectionHeader) => {
  const { collection } = props;
  const user = useSelector(getUserSelector);
  const [isMinting, setIsMinting] = useState(false);
  const { run: mintSingle } = useContractOperation<IMintChunksParams, Promise<Transaction | null>>({
    operation: useMintChunks,
  });
  const { run: mintBatch } = useContractOperation<IMintBatchChunksParams, Promise<Transaction | null>>({
    operation: useMintBatchChunks,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleMintSingle = async (file: File): Promise<void> => {
    if (!collection?.contract) {
      toast.error('Contract address not found.');
      return;
    }

    try {
      setIsMinting(true);
      const obj = {
        image: await fileToBase64(file),
      };
      console.log('json', JSON.stringify(obj));
      const chunks = Buffer.from(JSON.stringify(obj));
      await mintSingle({
        contractAddress: collection.contract,
        chunks: chunks,
      });
      toast.success('Transaction has been created. Please wait for minutes.');
    } catch (err: unknown) {
      console.log(err);
      toast.error((err as Error).message);
    } finally {
      setIsMinting(false);
    }
  };

  const handleMintBatch = async (file: File): Promise<void> => {
    if (!collection?.contract) {
      toast.error('Contract address not found.');
      return;
    }
    try {
      setIsMinting(true);
      const files: Record<string, Blob> = await unzipFile(file);
      let listOfChunks: Array<Array<Buffer>> = [];
      let currentChunks: Array<Buffer> = [];
      let currentBatchSize = 0;

      // Create batch of chunks
      for (const fileName in files) {
        const blob = files[fileName];
        const obj = {
          image: await fileToBase64(blob),
        };
        const chunks = Buffer.from(JSON.stringify(obj));
        const chunksSizeInKb = Buffer.byteLength(chunks) / 1000;
        if (chunksSizeInKb > BLOCK_CHAIN_FILE_LIMIT * 1000) {
          toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
          return;
        }
        if (currentBatchSize + chunksSizeInKb >= BLOCK_CHAIN_FILE_LIMIT * 1000) {
          // Split chunks and reset counter
          listOfChunks.push([...currentChunks]);
          currentChunks = [];
          currentBatchSize = 0;
          console.log('batch number', listOfChunks.length);
        }
        currentBatchSize += chunksSizeInKb;
        currentChunks.push(chunks);
        console.log('currentBatchSize', currentBatchSize);
      }

      console.log('batch number', listOfChunks.length);
      listOfChunks.push([...currentChunks]);
      console.log('listOfChunks', listOfChunks);

      for (let i = 0; i < listOfChunks.length; i++) {
        const batch = listOfChunks[i];
        await mintBatch({
          contractAddress: collection.contract,
          listOfChunks: batch,
        });
      }
      toast.success('Transaction has been created. Please wait for minutes.');
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Something went wrong. Please try again later.');
      console.log(err);
    } finally {
      setIsMinting(false);
    }
  };

  const handleMintFile = async (file: File): Promise<void> => {
    const fileName = file.name;
    const fileExt = getFileExtensionByFileName(fileName);
    if (!isERC721SupportedExt(fileExt)) {
      toast.error('Unsupported file extension.');
      return;
    }

    if (fileExt === ZIP_EXTENSION) {
      await handleMintBatch(file);
    } else {
      const fileSizeInKb = file.size / 1000;
      if (fileSizeInKb > BLOCK_CHAIN_FILE_LIMIT * 1000) {
        toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
        return;
      }

      await handleMintSingle(file);
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
    handleMintFile(file);
  };

  return (
    <Container>
      {collection && (
        <div className="infor">
          <div className="infor-left">
            <NFTDisplayBox contentClass="image" src={collection?.thumbnail} />
            <div>
              <p className="title">{collection?.name}</p>
              <p className="subTitle">{collection?.description}</p>
            </div>
          </div>
          <div className="infor-right">
            <div className="info-header">
              <div className="social">
                <a href={`${TC_EXPLORER}/address/${collection?.contract}`}>
                  <img src={`${CDN_URL}/icons/ic-tc-explorer-24x24.svg`} />
                </a>
                {collection.social.website && (
                  <a href={collection.social.website} target="_blank" className="link">
                    <IconSVG src={IcWebsite} />
                  </a>
                )}
                {collection.social.discord && (
                  <a href={collection.social.discord} target="_blank" className="link">
                    <IconSVG src={IcDiscord} />
                  </a>
                )}
                {collection.social.twitter && (
                  <a href={collection.social.twitter} target="_blank" className="link">
                    <IconSVG src={IcTwitter} />
                  </a>
                )}
              </div>
              {user?.walletAddress?.toLowerCase() === collection?.creator.toLowerCase() && (
                <div className="actionWrapper">
                  <div className="mintWrapper">
                    <button disabled={isMinting} className="mintButton">
                      {isMinting ? 'Minting...' : 'Mint'}
                    </button>
                    <FileUploader
                      onSelect={onChangeFile}
                      name={'fileUploader'}
                      classes={'file-uploader'}
                      fileOrFiles={file}
                      types={ERC721_SUPPORTED_EXTENSIONS}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="owner">OWNER</p>
              <a
                href={`https://explorer.trustless.computer/address/${collection?.creator}`}
                target="_blank"
                className="link"
              >
                {collection?.creator}
              </a>
            </div>
            <div>
              <p className="owner">CONTRACT</p>
              <a
                href={`https://explorer.trustless.computer/address/${collection?.contract}`}
                target="_blank"
                className="link"
              >
                {collection?.contract}
              </a>
            </div>
            <div className="row-bottom">
              <div>
                <p className="owner">COLLECTION NUMBER</p>
                <p className="address">#{collection?.index}</p>
              </div>
              <div>
                <p className="owner">ITEMS</p>
                <p className="address">{collection?.totalItems}</p>
              </div>
              <div>
                <p className="owner">BLOCK</p>
                <p className="address">{collection?.deployedAtBlock}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default React.memo(CollectionHeader);
