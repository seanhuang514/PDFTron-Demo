import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

const App = () => {
  

  return (
    <div>
      <h1>PDFTRON Demo</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
      <div>
        <Link to="/searchTextAndAddAnnotation">SearchTextAndAddAnnotation</Link>
      </div>
      <div>
        <Link to="/loadPdf">LoadPdf</Link>
      </div>
        
      <div>
        <Link to="/SaveAndImportSignature">SaveAndImportSignature</Link>
      </div>
        
      <div>
        <Link to="/TemplateGeneration">TemplateGeneration</Link>
      </div>
      <div>
        <Link to="/MergePdf">MergePdf</Link>
        </div>
        <div>
        <Link to="/SignatureTool">SignatureTool</Link>
      </div>
        
      </nav>
    </div>
  );
};

export default App;
