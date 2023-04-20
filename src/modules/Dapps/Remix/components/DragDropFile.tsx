import Button from '@/components/Button';
import SolFileIcon from '@/components/IconSVG/SolFileIcon';
import SolFileSelectedIcontsx from '@/components/IconSVG/SolFileSelectedIcon';
import Text from '@/components/Text';
import px2rem from '@/utils/px2rem';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const CancelButton = styled(Button)`
  padding: ${px2rem(12)} ${px2rem(24)};
  gap: ${px2rem(10)};
  border-radius: 8px;
  border: 2px solid #ffc008;
  min-width: ${px2rem(200)};
  text-decoration: none !important;
  width: fit-content;

  .button-solid-text {
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(26)};
    text-align: center;
    letter-spacing: 0.01em;
    color: #f9d03f;
    font-family: 'IBMPlexMono' !important;
  }

  :hover {
    opacity: 0.8;
  }
`;

const DeployButton = styled(Button)`
  padding: ${px2rem(12)} ${px2rem(24)};
  gap: ${px2rem(10)};
  border-radius: 8px;
  border: 2px solid #ffc008;
  min-width: ${px2rem(200)};
  text-decoration: none !important;
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);
  width: fit-content;

  .button-solid-text {
    font-weight: 500;
    font-size: ${px2rem(18)};
    line-height: ${px2rem(26)};
    text-align: center;
    letter-spacing: 0.01em;
    color: black;
    font-family: 'IBMPlexMono' !important;
  }

  :hover {
    opacity: 0.8;
  }
`;

export const Styled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  background: '#17171A' !important;

  .iconWrapper {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #form-file-upload {
    height: 16rem;
    width: 50%;
    max-width: 100%;
    text-align: center;
    align-self: center;
    background: '#17171A' !important;
    background-color: '#17171A' !important;
  }

  #input-file-upload {
    display: none;
  }

  #browseText {
    background: -webkit-linear-gradient(#ff8008, #ffc837);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    :hover {
      cursor: pointer;
    }
  }

  .button-text {
    text-align: 'center';
  }

  #text-container {
    margin-top: 10px;
    display: flex;
    flex-direction: 'row';
    align-items: center;
    justify-content: center;
  }

  #label-file-upload {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-radius: 1rem;
    border-style: dashed;
    border: 1px dashed #898989;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    /* background-color: '#17171A'; */
    background: '#17171A' !important;
    background-color: '#17171A' !important;
    border-radius: 12px;
  }

  #label-file-upload.drag-active {
    opacity: 0.8;
  }

  .browse-text {
    background: -webkit-linear-gradient(#ff8008, #ffc837);
    -webkit-text-fill-color: transparent;

    :hover {
      cursor: pointer;
    }
  }

  .desc-text {
    font-family: 'Bandeins Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #898989;
  }

  .upload-button:hover {
    text-decoration-line: underline;
  }

  #drag-file-element {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }

  .button-area {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

function DragDropFile() {
  const [dragActive, setDragActive] = useState(false);
  const [fileAlready, setFileAlready] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  // ref
  const inputRef = useRef(null) as { current: any };

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    // console.log('e: ', e);
    // console.log('e.dataTransfer: ', e.dataTransfer);
    // console.log('e.dataTransfer.files: ', e.dataTransfer.files);

    // Only support one file!
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let file = e.dataTransfer.files[0];
      if (file.name.endsWith('.sol')) {
        console.log('OK!');
        setFileAlready(true);
        setFileName(file.name || 'Unknow');
        setFileSize((file.size / 1024 || 0).toFixed(2));
      } else {
        console.log('File not support. You must use .sol');
        setFileAlready(false);
        setFileName('');
        setFileSize('0');
      }
    }

    // Support Mutil files (TO DO)
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const renderFileContent = () => {
    if (!fileAlready) {
      return (
        <>
          <Text size="medium" color="white" className="button-text" fontWeight="medium">
            {'Drag and drop a sol file, or '}
          </Text>
          <div style={{ width: 10 }} />
          <span id="browseText" onClick={onButtonClick}>
            Browse
          </span>
        </>
      );
    } else {
      return (
        <Text size="medium" color="white" className="button-text" fontWeight="medium">
          {fileName}
        </Text>
      );
    }
  };

  const renderFileDescription = () => {
    if (fileAlready) {
      return (
        <p color="white" className="desc-text">
          {`${fileSize} KB`}
        </p>
      );
    } else {
      return (
        <p color="white" className="desc-text">
          {'(Only support file .sol)'}
        </p>
      );
    }
  };

  return (
    <Styled>
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={false}
          onChange={handleChange}
          accept=".sol"
        />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? 'drag-active' : ''}>
          <div>
            <div className="iconWrapper">{fileAlready ? <SolFileSelectedIcontsx /> : <SolFileIcon />}</div>

            <div id="text-container">{renderFileContent()}</div>
            {renderFileDescription()}
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>

      {fileAlready ? (
        <div className="button-area">
          <CancelButton
            onClick={() => {
              console.log('TO DO CancelButton');
            }}
          >
            <p className="button-solid-text">Cancel</p>
          </CancelButton>
          <div style={{ width: 30 }} />
          <DeployButton
            onClick={() => {
              console.log('TO DO DeployButton');
            }}
          >
            <p className="button-solid-text">Deploy</p>
          </DeployButton>
        </div>
      ) : null}
    </Styled>
  );
}

export default DragDropFile;
