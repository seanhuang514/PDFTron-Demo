import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import '../App.css';

const LoadPdf = () => {
  const viewer = useRef(null);

  useEffect(() => {
    // WebViewer(
    //   {
    //     path: '/webviewer/lib',
    //     initialDoc: 'http://localhost:3000/api/v2/documents/1/download?file_format=pdf',
    //   },
    //   viewer.current
    // ).then((instance) => {
    //   setInstance(instance);
    //   const { documentViewer } = instance.Core;

    //   documentViewer.addEventListener('documentLoaded', () => {
    //   });
    // });

    // WebViewer(
    //   {
    //     path: '/webviewer/lib',
    //     // initialDoc: 'http://localhost:3000/api/v2/documents/1/download?file_format=pdf',
    //     fullAPI: true,
    //   },
    //   viewer.current
    // ).then(async (instance) => {
    //   setInstance(instance);
    //   const { documentViewer, PDFNet } = instance.Core;

    //   await PDFNet.initialize();
    //   await PDFNet.runWithCleanup(async () => main(PDFNet))
      

    //   documentViewer.addEventListener('documentLoaded', () => {
    //     alert('@@')
    //   });
    // });
    
    // loadPDFByPDFNet();
  }, [])

  const loadPDFByWebviewer = async () => {
    const v = await WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'http://localhost:3000/api/v2/documents/1/download?file_format=pdf',
        fullAPI: true,
      },
      viewer.current
    )

    console.log('v', v);
  }

  const loadPDFByPDFNet = async () => {
    const instance = await WebViewer(
      {
        path: '/webviewer/lib',
        fullAPI: true,
      },
      viewer.current
    )

    console.log('instance', instance);
      const { documentViewer, PDFNet } = instance.Core;

      await PDFNet.initialize();
      await PDFNet.runWithCleanup(async () => main(PDFNet))
  }

  const main = async (PDFNet) => {
    console.log('main');
    const doc = await PDFNet.PDFDoc.createFromURL('http://localhost:3000/api/v2/documents/1/download?file_format=pdf')
    doc.initSecurityHandler();
    doc.lock();

    const txtSearch = await PDFNet.TextSearch.create();
    let searchMode = PDFNet.TextSearch.Mode;
    let mode = PDFNet.TextSearch.Mode.e_whole_word | PDFNet.TextSearch.Mode.e_highlight;
    // 'pattern' can be a regular express when using 'e_reg_expression' mode
    let pattern = '{{ Signature A }}';
    txtSearch.begin(doc, pattern, mode);
    let result = await txtSearch.run();
    console.log('result', result);
    alert(JSON.stringify(result))
  };

  return (
    <div className="App">
      <button onClick={loadPDFByWebviewer}>Load PDF by webviewer</button>
      <button onClick={loadPDFByPDFNet}>Load PDF by PDFNet</button>
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
};

export default LoadPdf;