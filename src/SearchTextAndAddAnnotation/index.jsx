import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import '../App.css';

const SearchTextAndAddAnnotation = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/PDFTRON_about.pdf',
        fullAPI: true,
        // isReadOnly: true,
        disabledElements: [
          // 'viewControlsButton',
          // 'viewControlsOverlay',
          // 'header',
        ]
      },
      viewer.current,
    ).then((instance) => {
      setInstance(instance);
      const { documentViewer, PDFNet, Annotations, Search, annotationManager } = instance.Core;

      documentViewer.setSearchHighlightColors({
        // setSearchHighlightColors accepts both Annotations.Color objects or 'rgba' strings
        searchResult: new Annotations.Color(0, 0, 255, 0.5),
        activeSearchResult: 'rgba(0, 255, 0, 0.5)'
      });
      

      /**  full api init */
      documentViewer.addEventListener('documentLoaded', async () => {
        await PDFNet.initialize();
        const doc = documentViewer.getDocument();
        const pdfDoc = await doc.getPDFDoc();
        // Ensure that we have our first page.
        await pdfDoc.requirePage(1);
        // Run our main function using 'runWithCleanup'
        await PDFNet.runWithCleanup(async () => await main(PDFNet, pdfDoc));
        
        // Refresh the cache with the newly updated document
        documentViewer.refreshAll();
        // Update viewer with new document
        documentViewer.updateView();
        documentViewer.setCurrentPage(9);
      });

      const normalStyles = (widget) => {
        // console.log('widget', widget);
        if (widget instanceof Annotations.TextWidgetAnnotation) {
          return {
            'background-color': '#a5c7ff',
            color: 'white',
          };
        } else if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            // 幫簽名匡加邊匡
            border: '1px solid #a5c7ff',
          };
        }
      };

      const modifyHandler = async (annotation) => {
        const rect = await annotation.getRect();
        console.log('rect', rect);
        const width = Math.round(rect.x2 - rect.x1)
        const height = Math.round(rect.y2 - rect.y1)
        await annotation.setContents(`width = ${width} \n height = ${height} \n position = ${JSON.stringify(rect)}`)
      }

      annotationManager.on('annotationChanged', (annotations, action, { imported }) => {
        if (action === 'modify') {
          modifyHandler(annotations[0])
        }
        if (imported && action === 'add') {
          annotations.forEach(function(annot) {
            if (annot instanceof Annotations.WidgetAnnotation) {
              Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
              
              if (annot.fieldName === 'mySignature') {
                console.log(annot.getCustomData('data'))
              }
            }
          });
        }
      });
    });
  }, []);

  const main = async (PDFNet, doc) => {
    // alert("Hello WebViewer!");
    console.log('Hello WebViewer!')
    doc.initSecurityHandler();
    doc.lock();
    const txtSearch = await PDFNet.TextSearch.create();
    let searchMode = PDFNet.TextSearch.Mode;
    let mode = PDFNet.TextSearch.Mode.e_whole_word | PDFNet.TextSearch.Mode.e_highlight;
    // 'pattern' can be a regular express when using 'e_reg_expression' mode
    let pattern = 'Vendor Lock-in';
    txtSearch.begin(doc, pattern, mode);
    let result = await txtSearch.run();
    console.log('result', result);
    let hlts = result.highlights;
    await hlts.begin(doc); // is await needed?

    while (await hlts.hasNext()) {
      const curPage = await doc.getPage(await hlts.getCurrentPageNumber());
      const quadArr = await hlts.getCurrentQuads();
      console.log('quadArr', quadArr);
      for (let i = 0; i < quadArr.length; ++i) {
        const currQuad = quadArr[i];
        const x1 = Math.min(Math.min(Math.min(currQuad.p1x, currQuad.p2x), currQuad.p3x), currQuad.p4x);
        const x2 = Math.max(Math.max(Math.max(currQuad.p1x, currQuad.p2x), currQuad.p3x), currQuad.p4x);
        const y1 = Math.min(Math.min(Math.min(currQuad.p1y, currQuad.p2y), currQuad.p3y), currQuad.p4y);
        const y2 = Math.max(Math.max(Math.max(currQuad.p1y, currQuad.p2y), currQuad.p3y), currQuad.p4y);
        const rect = await PDFNet.Rect.init(x1, y1, x2, y2); // left, bottom, right, top
        console.log('rect', rect);
        const widgetAnnot =
          await PDFNet.SignatureWidget.create(doc, rect, 'mySignature');
        
        widgetAnnot.setCustomData('data', '123')
        await curPage.annotPushBack(widgetAnnot);


        
        const rect3 = await PDFNet.Rect.init(100, 100, 250 + 50, 250);
        const width = await rect3.width()
        const height = await rect3.height()
        const position = await rect3.get();
        console.log(`width = ${width}, height = ${height}`)
        console.log('position', position);
        const txtannot = await PDFNet.FreeTextAnnot.create(doc, rect3); 
        await txtannot.setContents(`width = ${width} \n height = ${height} \n position = ${JSON.stringify(position)}`)
        
        const solidLine = await PDFNet.AnnotBorderStyle.create(PDFNet.AnnotBorderStyle.Style.e_solid, 1, 10, 20);
        await txtannot.setBorderStyle(solidLine, true);
        await txtannot.setQuaddingFormat(0);
        await curPage.annotPushBack(txtannot);
        await txtannot.refreshAppearance();
      }
      hlts.next();
    }
  }

  const downloadDocument = async () => {
    console.log('instance', instance);
    // await instance.UI.downloadPdf({
    //   includeAnnotations: true,
    // });

  }

  return (
    <div className="App">
      <div className="header">
        React sample
        <button onClick={downloadDocument}>download</button>
      </div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default SearchTextAndAddAnnotation;
