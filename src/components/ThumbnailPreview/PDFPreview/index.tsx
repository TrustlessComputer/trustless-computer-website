import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/Utils/ClientOnly';
import React, { useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { StyledPDFPreview } from './PDFPreview.styled';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IProps {
  url: string;
}

const PDFPreview: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const { url } = props;

  const renderLoading = useMemo(() => <Spinner />, []);

  const renderError = useMemo(
    () => (
      <div className={'centerContainer'}>
        <p className={'errorMessage'}>An error occurred!</p>
      </div>
    ),
    [],
  );

  return (
    <ClientOnly>
      <StyledPDFPreview className={'pdfPreview'}>
        <Document file={url} loading={renderLoading} error={renderError}>
          <Page pageIndex={0} />
        </Document>
      </StyledPDFPreview>
    </ClientOnly>
  );
};

export default PDFPreview;
