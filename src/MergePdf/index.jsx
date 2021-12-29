import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import '../App.css';

const MergePdf = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/sign.pdf',
        fullAPI: true,
      },
      viewer.current
    ).then((instance) => {
      setInstance(instance);
      const { documentViewer, PDFNet } = instance.Core;

      documentViewer.addEventListener('documentLoaded', async () => {
        await PDFNet.initialize();
        // await PDFNet.runWithCleanup(async () => main(PDFNet))
      });
    });
  }, []);

  const mergePdf = async () => {
    const { documentViewer, PDFNet, createDocument } = instance.Core;
    const newDoc = await createDocument('/files/log.pdf')
    const doc = documentViewer.getDocument();
    const newPageCount = doc.getPageCount() + newDoc.getPageCount();
    doc.insertPages(newDoc, [1], doc.getPageCount() + 1);
    documentViewer.updateView();
  }

  const mergePdfByFullApi = async () => {
    const { PDFNet, documentViewer } = instance.Core;
    await PDFNet.initialize();
    const doc = await PDFNet.PDFDoc.createFromURL('/files/sign.pdf');
    const newDoc = await PDFNet.PDFDoc.createFromURL('/files/log.pdf');
    await doc.insertPages(2, newDoc, 1, 1, 0)
    await documentViewer.loadDocument(doc)
    await documentViewer.updateView();
  }

  return (
    <div className="App">
      <button onClick={mergePdf}>Merge PDF</button>
      <button onClick={mergePdfByFullApi}>Merge PDF by full api</button>
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
}

export default MergePdf;