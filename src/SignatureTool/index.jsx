import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import Spinner from './Spinner'
import './style.css';

const Slider = () => {
  return (
    <input
      type="range"
      onInput={() => { /* Do something */ }}
    >
    </input>
  );
}

const SignatureTool = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        css: 'assets/style.css',
        fullAPI: true,
        disabledElements: [
          'header',
          'toolsHeader',
          'rubberStampToolGroupButton',
          'stampToolGroupButton',
          'fileAttachmentToolGroupButton',
          'calloutToolGroupButton',
          'eraserToolButton',
          'undoButton',
          'redoButton',
          'ribbons',
          'leftPanelButton',
          'viewControlsButton',
          'zoomOverlayButton',
          'panToolButton',
          'selectToolButton',
          'searchButton',
          'toggleNotesButton',
          'menuButton',
          'divider',
          'annotationCommentButton',
          'linkButton',
          'searchPanel',
          'contextMenuPopup'
        ]
      },
      viewer.current
    ).then(async (instance) => {
      const { PDFNet, documentViewer, Tools } = instance.Core;

      instance.UI.setSignatureFonts(['Arizonia']);

      instance.UI.setToolbarGroup('toolbarGroup-Insert');
      
      const tool = documentViewer.getTool(Tools.ToolNames.SIGNATURE);  
      tool.addEventListener('annotationAdded', (annotation) => {
        console.log('Add Signature')
      });
      
      documentViewer.addEventListener('finishedRendering', () => {
        setReady(true); // Prevent error before rendering is done.
      })

      instance.UI.setMaxSignaturesCount(1);
      await setInstance(instance);
      
      await PDFNet.initialize();
      const doc = await PDFNet.PDFDoc.create();
      let page = await doc.pageCreate();
      doc.pagePushBack(page);
      await documentViewer.loadDocument(doc)
      await documentViewer.refreshAll();
      await documentViewer.updateView();
    });
  }, [])

  return (
    <div>
      <div className="webviewer1" ref={viewer}>
        {!ready && <div className="overlay"><Spinner /></div>}
      </div>
    </div>
  )
}

export default SignatureTool;
