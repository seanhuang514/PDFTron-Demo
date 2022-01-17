import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import Spinner from './Spinner'
import Preview from './Preview'
import './style.css';

const SignatureTool = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [signature, setSignature] = useState(null);
  const [ready, setReady] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        css: 'assets/style.css',
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
          'contextMenuPopup',
          'imageSignaturePanelButton',
          'colorPalette'
        ]
      },
      viewer.current
    ).then(async (instance) => {
      const { PDFNet, documentViewer, Tools, Annotations } = instance.Core;

      instance.UI.setSignatureFonts(['Tangerine']);

      instance.UI.setColorPalette(['#FF0000', '', '#DDDDDD', 'transparency']);

      instance.UI.setToolbarGroup('toolbarGroup-Insert');
      instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.ESCAPE);

      const tool = documentViewer.getTool(Tools.ToolNames.SIGNATURE);

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

      const previewHandler = async (annotation) => {
        console.log('annotation', annotation);
        const r = await tool.getPreview(annotation)
        setSignature(r);
        console.log('r', r);
      }

      tool.addEventListener('signatureSaved', (annotations) => {
        annotations[0].Width = 200;
        annotations[0].Height = 170;

        setPreview(true);
        previewHandler(annotations[0])
      });

      documentViewer.addEventListener('finishedRendering', () => {
        setReady(true);
      })

      instance.UI.openElements(['signatureModal']);

    });
  }, [])

  const handleSignatureChange = () => {
    setPreview(false);
    instance.UI.openElements(['signatureModal']);
  }

  return (
    <div>
      <div className="webviewer1" ref={viewer}>
        {!ready && <Spinner />}
        {preview && <Preview signature={signature} handleChange={handleSignatureChange} />}
      </div>
    </div>
  )
}

export default SignatureTool;
