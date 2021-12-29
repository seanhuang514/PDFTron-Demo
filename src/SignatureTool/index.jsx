import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
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

const newCustomElement = {
  type: 'customElement',
  render: () => <Slider />
};

const SignatureTool = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        fullAPI: true,
        disabledElements: [
          // 'header',
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
      const { PDFNet, documentViewer, Tools, Annotations } = instance.Core;
      
      instance.UI.setToolbarGroup('toolbarGroup-Insert');
      
      const tool = documentViewer.getTool(Tools.ToolNames.SIGNATURE);  
      tool.addEventListener('annotationAdded', (annotation) => {
        console.log('Add Signature')
      });

      instance.UI.setHeaderItems(header => {
        header.update([{
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: () => {
            // save the annotations
            alert('save signature');
          }
        }]);
      });

      instance.UI.setHeaderItems(header => {
        header.unshift({
          type: 'customElement',
          render: () => {
            const logo = document.createElement('img');
            logo.src = '/files/logo-v2.svg';
            logo.style.width = '200px';
            logo.style.marginLeft = '10px';
            logo.style.cursor = 'pointer';
            logo.onclick = () => {
              window.open('https://www.pdftron.com', '_blank');
            }
            return logo;
          },
          title: 'save signature',
        }, {
          type: 'spacer'
        });
      });


      instance.UI.setHeaderItems(function(header) {
        // get the tools overlay
        const toolsOverlay = header.getHeader('toolbarGroup-Annotate').get('toolsOverlay');
        header.getHeader('toolbarGroup-Annotate').delete('toolsOverlay');
        // // add the line tool to the top header
        console.log('def', header.getHeader('default'));
        header.getHeader('default').push({
          type: 'toolGroupButton',
          toolGroup: 'signatureTools',
          dataElement: 'signatureToolButton',
          title: 'annotation.signature',
        });
        // add the tools overlay to the top header
        header.push(toolsOverlay);
      });


      instance.UI.setMaxSignaturesCount(1);
      await setInstance(instance);
      
      await PDFNet.initialize();
      const doc = await PDFNet.PDFDoc.create();
      const pageRect = await PDFNet.Rect.init(0, 0, 300, 300);
      let page = await doc.pageCreate();
      doc.pagePushBack(page);
      await documentViewer.loadDocument(doc)
      await documentViewer.refreshAll();
      await documentViewer.updateView();

      // const signatureTool = await documentViewer.getTool('AnnotationCreateSignature');
      // await instance.UI.openElements(['signatureModal']);

    });
  }, [])

  return (
    <div>
      <div className="webviewer1" ref={viewer}></div>
    </div>
  )
}

export default SignatureTool;
