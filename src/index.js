import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import SearchTextAndAddAnnotation from './SearchTextAndAddAnnotation';
import LoadPdf from './LoadPdf';
import SaveAndImportSignature from './SaveAndImportSignature';
import TemplateGeneration from './TemplateGeneration'
import MergePdf from './MergePdf'
import SignatureTool from './SignatureTool';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="searchTextAndAddAnnotation" element={<SearchTextAndAddAnnotation />} />
      <Route path="loadPdf" element={<LoadPdf />} />
      <Route path="SaveAndImportSignature" element={<SaveAndImportSignature />} />
      <Route path="TemplateGeneration" element={<TemplateGeneration />} />
      <Route path="MergePdf" element={<MergePdf />} />
      <Route path="SignatureTool" element={<SignatureTool />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);