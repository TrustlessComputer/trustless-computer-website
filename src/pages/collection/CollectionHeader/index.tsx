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
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { Transaction } from 'ethers';
import { toast } from 'react-hot-toast';
import { FileUploader } from 'react-drag-drop-files';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { Buffer } from 'buffer';
import { fileToBase64 } from '@/utils';

interface ICollectionHeader {
  collection?: ICollection;
}

const CollectionHeader = (props: ICollectionHeader) => {
  const { collection } = props;
  const user = useSelector(getUserSelector);
  const [isMinting, setIsMinting] = useState(false);
  const { run } = useContractOperation<IMintChunksParams, Promise<Transaction | null>>({
    operation: useMintChunks,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleMint = async (file: File) => {
    if (!collection?.contract) {
      return;
    }

    try {
      setIsMinting(true);
      const obj = {
        image: await fileToBase64(file),
      };
      console.log('json', JSON.stringify(obj));
      const chunks = Buffer.from(JSON.stringify(obj));
      await run({
        contractAddress: collection.contract,
        chunks: chunks,
      });
      toast.success('Transaction has been created. Please wait for minutes.');
    } catch (err: unknown) {
      toast.error((err as Error).message);
    } finally {
      setIsMinting(false);
    }
  };

  const onChangeFile = (file: File): void => {
    console.log(file);
    setFile(file);
    handleMint(file);
  };

  const onSizeError = (): void => {
    toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
  };

  return (
    <Container>
      {collection && (
        <div className="infor">
          <div className="infor-left">
            <NFTDisplayBox contentClass="image" thumbnail={collection?.thumbnail} />
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
                      handleChange={onChangeFile}
                      name={'fileUploader'}
                      maxSize={BLOCK_CHAIN_FILE_LIMIT}
                      onSizeError={onSizeError}
                      classes={'file-uploader'}
                      fileOrFiles={file}
                      types={['png', 'jpeg', 'jpg', 'webp']}
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
