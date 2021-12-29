import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import '../App.css';


const TemplateGeneration = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const jsonData = {
    name: 'My Document',
    created: new Date().getString,
    total_pages: 1,
    uuid: 'mj2m32m3-jn2m32-km2kmlk32-mklmkl32',
    sent_time: new Date().getString,
    status: 'signed',
    sender: 'seander@email.com',
    signers: 'signer1@email.com, signer2@email.com',
    cc: 'cc1@email.com, cc2@email.com',
    logs: {
      insert_rows: [
        ['LegalTemplates', 'Uploaded the Document', 'support@legaltemplates.net', '08/04/2021 04:50:20 am UTC', '', '72.14.177.139'],
        ['LegalTemplates', 'Uploaded the Document','support@legaltemplates.net','08/04/2021 04:50:20 am UTC', '', '72.14.177.139']
      ]
    },
    // logo: {
    //   image_url: '/public/files/logo.jpg',
    //   width: 180,
    //   height: 30,
    // }
  }


  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/log-template.docx',
        fullAPI: true,
      },
      viewer.current
    ).then((instance) => {
      setInstance(instance)
      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        
      });
    })
  }, [])

  const loadDataAndRender = () => {
    const { documentViewer } = instance.Core;
    const doc = documentViewer.getDocument();
    doc.documentCompletePromise();
    documentViewer.updateView();

    const keys = doc.getTemplateKeys();
    console.log(keys);
  
    doc.applyTemplateValues(jsonData);
  }
  return (
    <div className="App">
      <button onClick={loadDataAndRender}>Load data and render</button>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
}

export default TemplateGeneration;