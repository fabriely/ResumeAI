import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './index';

const PDFRenderer = ({ id }: { id: number }) => (
  <PDFViewer>
    <MyDocument id={id} />
  </PDFViewer>
);

export default PDFRenderer;