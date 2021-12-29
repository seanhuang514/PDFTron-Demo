import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import '../App.css';
import fileSaver from "file-saver";

const SaveAndImportSignature = () => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const signatureJson = '[[{"x":110.2803738317757,"y":1.8691588785046729},{"x":108.41121495327103,"y":1.8691588785046729},{"x":95.32710280373831,"y":5.607476635514018},{"x":76.6355140186916,"y":9.345794392523365},{"x":42.99065420560748,"y":13.08411214953271},{"x":16.822429906542055,"y":20.560747663551403},{"x":3.7383177570093458,"y":26.16822429906542},{"x":1.8691588785046729,"y":29.906542056074766},{"x":1.8691588785046729,"y":37.38317757009346},{"x":28.037383177570092,"y":59.81308411214953},{"x":130.84112149532712,"y":106.54205607476635},{"x":162.61682242990653,"y":117.75700934579439},{"x":194.39252336448598,"y":125.23364485981308},{"x":198.13084112149534,"y":127.10280373831776},{"x":198.13084112149534,"y":128.97196261682242},{"x":196.26168224299064,"y":128.97196261682242},{"x":183.17757009345794,"y":130.84112149532712},{"x":155.14018691588785,"y":132.71028037383178},{"x":125.23364485981308,"y":134.57943925233644},{"x":100.93457943925233,"y":138.3177570093458},{"x":97.19626168224299,"y":138.3177570093458},{"x":100.93457943925233,"y":136.44859813084113},{"x":108.41121495327103,"y":134.57943925233644}]]'
  const signatureJson2 = '[[{"x":30,"y":4.666666666666667},{"x":30,"y":4.666666666666667},{"x":30,"y":4},{"x":30,"y":4},{"x":29.333333333333332,"y":3.333333333333334},{"x":28.666666666666664,"y":2.666666666666667},{"x":26.666666666666664,"y":2},{"x":24.666666666666664,"y":1.3333333333333335},{"x":22.666666666666664,"y":0.6666666666666667},{"x":20.666666666666664,"y":0.6666666666666667},{"x":19.333333333333332,"y":0.6666666666666667},{"x":18,"y":0.6666666666666667},{"x":16.666666666666664,"y":0.6666666666666667},{"x":14.666666666666666,"y":0.6666666666666667},{"x":12.666666666666666,"y":1.3333333333333335},{"x":10.666666666666666,"y":1.3333333333333335},{"x":9.333333333333332,"y":2},{"x":8.666666666666666,"y":2.666666666666667},{"x":7.333333333333333,"y":3.333333333333334},{"x":6,"y":4},{"x":4.666666666666666,"y":5.333333333333334},{"x":3.333333333333333,"y":7.333333333333334},{"x":2.6666666666666665,"y":8.666666666666668},{"x":2,"y":9.333333333333334},{"x":2,"y":10.666666666666668},{"x":2,"y":12.000000000000002},{"x":2,"y":12.666666666666668},{"x":2,"y":14.000000000000002},{"x":2,"y":15.333333333333336},{"x":2,"y":16},{"x":2,"y":18.666666666666668},{"x":2.6666666666666665,"y":19.333333333333336},{"x":3.333333333333333,"y":21.333333333333336},{"x":4.666666666666666,"y":23.333333333333336},{"x":5.333333333333333,"y":23.333333333333336},{"x":8,"y":24.000000000000004},{"x":12,"y":24.666666666666668},{"x":16.666666666666664,"y":25.333333333333336},{"x":22,"y":26.66666666666667},{"x":26.666666666666664,"y":27.333333333333336},{"x":30.666666666666664,"y":28.66666666666667},{"x":32.666666666666664,"y":29.333333333333336},{"x":33.33333333333333,"y":30.000000000000004},{"x":34,"y":30.66666666666667},{"x":34.666666666666664,"y":31.333333333333336},{"x":34.666666666666664,"y":33.333333333333336},{"x":36.666666666666664,"y":36.66666666666667},{"x":36.666666666666664,"y":38.00000000000001},{"x":37.33333333333333,"y":40.00000000000001},{"x":37.33333333333333,"y":43.333333333333336},{"x":37.33333333333333,"y":44.00000000000001},{"x":36.666666666666664,"y":46.00000000000001},{"x":35.33333333333333,"y":48.00000000000001},{"x":33.33333333333333,"y":50.66666666666667},{"x":30.666666666666664,"y":52.66666666666667},{"x":28,"y":54.66666666666667},{"x":23.333333333333332,"y":57.33333333333334},{"x":22,"y":58.00000000000001},{"x":20,"y":59.33333333333334},{"x":18.666666666666664,"y":59.33333333333334},{"x":17.333333333333332,"y":59.33333333333334},{"x":16,"y":58.66666666666667},{"x":12,"y":58.00000000000001},{"x":8.666666666666666,"y":56.00000000000001},{"x":5.333333333333333,"y":55.33333333333334},{"x":2.6666666666666665,"y":52.66666666666667},{"x":1.3333333333333333,"y":52.00000000000001},{"x":0.6666666666666666,"y":51.333333333333336},{"x":0.6666666666666666,"y":50.66666666666667},{"x":0.6666666666666666,"y":50.00000000000001},{"x":0.6666666666666666,"y":49.333333333333336},{"x":0.6666666666666666,"y":48.00000000000001},{"x":0.6666666666666666,"y":48.00000000000001},{"x":0.6666666666666666,"y":48.00000000000001},{"x":0.6666666666666666,"y":48.00000000000001},{"x":0.6666666666666666,"y":47.333333333333336}],[{"x":52,"y":40.66666666666667},{"x":52,"y":40.66666666666667},{"x":52,"y":40.66666666666667},{"x":54,"y":41.333333333333336},{"x":60,"y":42.00000000000001},{"x":68,"y":42.66666666666667},{"x":77.33333333333333,"y":43.333333333333336},{"x":81.33333333333333,"y":43.333333333333336},{"x":84,"y":43.333333333333336},{"x":86,"y":43.333333333333336},{"x":88,"y":42.66666666666667},{"x":90,"y":42.66666666666667},{"x":92.66666666666666,"y":42.00000000000001},{"x":94,"y":40.66666666666667},{"x":95.33333333333333,"y":39.333333333333336},{"x":95.33333333333333,"y":38.00000000000001},{"x":94.66666666666666,"y":36.66666666666667},{"x":93.33333333333333,"y":34.00000000000001},{"x":90.66666666666666,"y":32},{"x":87.33333333333333,"y":29.333333333333336},{"x":83.33333333333333,"y":26.66666666666667},{"x":78.66666666666666,"y":24.666666666666668},{"x":73.33333333333333,"y":23.333333333333336},{"x":69.33333333333333,"y":22.666666666666668},{"x":67.33333333333333,"y":22.666666666666668},{"x":66,"y":22.666666666666668},{"x":65.33333333333333,"y":23.333333333333336},{"x":63.33333333333333,"y":24.000000000000004},{"x":62,"y":24.666666666666668},{"x":59.33333333333333,"y":26.66666666666667},{"x":58.666666666666664,"y":27.333333333333336},{"x":57.33333333333333,"y":28.66666666666667},{"x":56.666666666666664,"y":30.000000000000004},{"x":56,"y":31.333333333333336},{"x":55.33333333333333,"y":32.66666666666667},{"x":54.666666666666664,"y":34.00000000000001},{"x":53.33333333333333,"y":36.00000000000001},{"x":52.666666666666664,"y":37.333333333333336},{"x":52,"y":39.333333333333336},{"x":52,"y":40.66666666666667},{"x":52,"y":42.00000000000001},{"x":52,"y":44.00000000000001},{"x":52.666666666666664,"y":45.333333333333336},{"x":53.33333333333333,"y":48.66666666666667},{"x":54.666666666666664,"y":50.66666666666667},{"x":57.33333333333333,"y":53.33333333333334},{"x":60.666666666666664,"y":56.66666666666667},{"x":62.666666666666664,"y":56.66666666666667},{"x":65.33333333333333,"y":56.66666666666667},{"x":69.33333333333333,"y":57.33333333333334},{"x":69.33333333333333,"y":57.33333333333334},{"x":70.66666666666666,"y":57.33333333333334},{"x":73.33333333333333,"y":57.33333333333334},{"x":78,"y":57.33333333333334},{"x":83.33333333333333,"y":58.00000000000001},{"x":88,"y":59.33333333333334},{"x":90.66666666666666,"y":59.33333333333334},{"x":91.33333333333333,"y":59.33333333333334},{"x":92,"y":59.33333333333334},{"x":92.66666666666666,"y":59.33333333333334},{"x":94,"y":58.66666666666667},{"x":94.66666666666666,"y":58.00000000000001},{"x":96,"y":56.66666666666667},{"x":96.66666666666666,"y":56.66666666666667},{"x":97.33333333333333,"y":56.00000000000001},{"x":97.33333333333333,"y":55.33333333333334},{"x":97.33333333333333,"y":55.33333333333334},{"x":97.33333333333333,"y":55.33333333333334},{"x":97.33333333333333,"y":55.33333333333334},{"x":96,"y":54.66666666666667}],[{"x":136,"y":25.333333333333336},{"x":134.66666666666666,"y":26.000000000000004},{"x":130.66666666666666,"y":26.66666666666667},{"x":122,"y":28.000000000000004},{"x":115.33333333333333,"y":28.66666666666667},{"x":112.66666666666666,"y":30.000000000000004},{"x":111.33333333333333,"y":30.66666666666667},{"x":110.66666666666666,"y":32.66666666666667},{"x":109.33333333333333,"y":35.333333333333336},{"x":108.66666666666666,"y":40.00000000000001},{"x":108,"y":40.66666666666667},{"x":108.66666666666666,"y":43.333333333333336},{"x":109.33333333333333,"y":45.333333333333336},{"x":109.33333333333333,"y":46.00000000000001},{"x":110.66666666666666,"y":48.00000000000001},{"x":112.66666666666666,"y":49.333333333333336},{"x":114.66666666666666,"y":50.66666666666667},{"x":117.33333333333333,"y":52.00000000000001},{"x":120.66666666666666,"y":54.00000000000001},{"x":123.33333333333333,"y":55.33333333333334},{"x":124.66666666666666,"y":55.33333333333334},{"x":126,"y":55.33333333333334},{"x":127.33333333333333,"y":54.66666666666667},{"x":128.66666666666666,"y":53.33333333333334},{"x":130.66666666666666,"y":51.333333333333336},{"x":132,"y":50.00000000000001},{"x":133.33333333333331,"y":48.00000000000001},{"x":134.66666666666666,"y":45.333333333333336},{"x":135.33333333333331,"y":44.00000000000001},{"x":136,"y":41.333333333333336},{"x":136.66666666666666,"y":39.333333333333336},{"x":137.33333333333331,"y":36.66666666666667},{"x":137.33333333333331,"y":36.66666666666667},{"x":138,"y":36.00000000000001},{"x":138,"y":35.333333333333336},{"x":138,"y":34.66666666666667},{"x":138,"y":34.00000000000001},{"x":138,"y":33.333333333333336},{"x":138,"y":32.66666666666667},{"x":138,"y":32},{"x":138,"y":31.333333333333336},{"x":138,"y":30.66666666666667},{"x":138,"y":30.000000000000004},{"x":138,"y":29.333333333333336},{"x":138,"y":29.333333333333336},{"x":138,"y":28.66666666666667},{"x":138,"y":28.66666666666667},{"x":138,"y":26.66666666666667},{"x":137.33333333333331,"y":24.666666666666668},{"x":137.33333333333331,"y":24.000000000000004},{"x":137.33333333333331,"y":25.333333333333336},{"x":138,"y":30.000000000000004},{"x":138,"y":34.00000000000001},{"x":140,"y":40.00000000000001},{"x":140,"y":41.333333333333336},{"x":140.66666666666666,"y":43.333333333333336},{"x":141.33333333333331,"y":44.66666666666667},{"x":141.33333333333331,"y":46.00000000000001},{"x":142,"y":46.66666666666667},{"x":142,"y":47.333333333333336},{"x":142,"y":48.66666666666667},{"x":142,"y":50.00000000000001},{"x":142.66666666666666,"y":50.66666666666667},{"x":142.66666666666666,"y":51.333333333333336},{"x":144,"y":52.00000000000001},{"x":144,"y":52.66666666666667},{"x":144,"y":52.66666666666667},{"x":144.66666666666666,"y":52.66666666666667},{"x":146.66666666666666,"y":53.33333333333334},{"x":149.33333333333331,"y":54.66666666666667},{"x":152,"y":56.00000000000001},{"x":152.66666666666666,"y":56.66666666666667},{"x":152.66666666666666,"y":56.00000000000001},{"x":152.66666666666666,"y":55.33333333333334}],[{"x":164,"y":21.333333333333336},{"x":164,"y":22.666666666666668},{"x":164,"y":26.000000000000004},{"x":164,"y":31.333333333333336},{"x":164,"y":37.333333333333336},{"x":164,"y":43.333333333333336},{"x":164.66666666666666,"y":48.00000000000001},{"x":164.66666666666666,"y":48.66666666666667},{"x":164.66666666666666,"y":49.333333333333336},{"x":164.66666666666666,"y":50.00000000000001},{"x":164.66666666666666,"y":50.66666666666667},{"x":164,"y":52.00000000000001},{"x":164,"y":53.33333333333334},{"x":163.33333333333331,"y":54.00000000000001},{"x":163.33333333333331,"y":54.00000000000001},{"x":164,"y":53.33333333333334},{"x":164,"y":52.66666666666667},{"x":164,"y":50.66666666666667},{"x":164,"y":50.00000000000001},{"x":164,"y":50.00000000000001},{"x":164.66666666666666,"y":48.66666666666667},{"x":165.33333333333331,"y":45.333333333333336},{"x":166,"y":42.66666666666667},{"x":166.66666666666666,"y":40.00000000000001},{"x":167.33333333333331,"y":37.333333333333336},{"x":167.33333333333331,"y":35.333333333333336},{"x":167.33333333333331,"y":33.333333333333336},{"x":168,"y":32.66666666666667},{"x":168,"y":32},{"x":168,"y":31.333333333333336},{"x":168.66666666666666,"y":30.66666666666667},{"x":169.33333333333331,"y":30.000000000000004},{"x":170,"y":29.333333333333336},{"x":171.33333333333331,"y":29.333333333333336},{"x":172,"y":28.66666666666667},{"x":174,"y":28.66666666666667},{"x":176.66666666666666,"y":29.333333333333336},{"x":178.66666666666666,"y":29.333333333333336},{"x":180.66666666666666,"y":29.333333333333336},{"x":183.33333333333331,"y":30.000000000000004},{"x":184.66666666666666,"y":30.000000000000004},{"x":185.33333333333331,"y":30.000000000000004},{"x":186,"y":30.000000000000004},{"x":187.33333333333331,"y":31.333333333333336},{"x":188.66666666666666,"y":32.66666666666667},{"x":190,"y":34.00000000000001},{"x":190.66666666666666,"y":35.333333333333336},{"x":192,"y":36.66666666666667},{"x":193.33333333333331,"y":38.00000000000001},{"x":194.66666666666666,"y":40.00000000000001},{"x":196,"y":41.333333333333336},{"x":196.66666666666666,"y":42.66666666666667},{"x":197.33333333333331,"y":43.333333333333336},{"x":197.33333333333331,"y":45.333333333333336},{"x":197.33333333333331,"y":46.66666666666667},{"x":197.33333333333331,"y":48.00000000000001},{"x":198,"y":49.333333333333336},{"x":198,"y":50.66666666666667},{"x":198,"y":52.00000000000001},{"x":198,"y":52.66666666666667},{"x":198,"y":53.33333333333334},{"x":198,"y":54.00000000000001},{"x":198,"y":54.66666666666667},{"x":198,"y":55.33333333333334},{"x":198,"y":55.33333333333334},{"x":198,"y":56.00000000000001},{"x":198,"y":56.00000000000001},{"x":198,"y":56.66666666666667},{"x":198,"y":58.00000000000001},{"x":198,"y":58.66666666666667},{"x":198,"y":59.33333333333334},{"x":198.66666666666666,"y":60.66666666666667},{"x":199.33333333333331,"y":62.00000000000001},{"x":199.33333333333331,"y":62.00000000000001},{"x":199.33333333333331,"y":62.00000000000001}]]'


  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/signed2.pdf',
        fullAPI: true,
      },
      viewer.current
    ).then((instance) => {
      setInstance(instance)
      const { documentViewer, annotationManager, Annotations } = instance.Core
      const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
      // loadBase64Image();
      // console.log('signatureTool', signatureTool);

      documentViewer.addEventListener('documentLoaded', () => {
        // signatureTool.importSignatures([base64ImageString]);
        signatureTool.importSignatures([JSON.parse(signatureJson2)]);
        
      });

      documentViewer.addEventListener('annotationsLoaded', async () => {
        annotationManager.addEventListener('annotationSelected', async (annotationList) => {
          annotationList.forEach(annotation => {
            if (annotation.Subject === "Signature") {
              console.log('selected signature')
              // console.log('path', annotation.getPath())
              // debugger;
              // extractAnnotationSignature(annotation, documentViewer);
            }
                    
          })
        })
      });

      annotationManager.on('annotationChanged', (annotations, action, { imported }) => {
        if (action === 'modify') {
          
        }

        if (action === 'add' && imported) {
          annotations.forEach(function(annot) {
            if (annot instanceof Annotations.WidgetAnnotation) {
            }
          });
        }

        if (action === 'add' && !imported) {
          const annotation = annotations[0];
          // annotation instanceof Annotations.FreeHandAnnotation
          console.log('annotation', annotation);
          // debugger;
          
        }
      });

      
    });
  }, []);

  

  const loadBase64Image = async () => {
    const url = '/files/signature-draw.png'
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader()
    reader.onloadend = () => {
      console.log('base64Image', reader.result);
      setSignatureImage((prev) => {
        console.log('set image complete')
        return reader.result;
      })
    }

    reader.readAsDataURL(blob)
  }

  const loadSignatureImage = () => {
    const { documentViewer } = instance.Core
    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    signatureTool.importSignatures([signatureImage]);
  }

  const exportSignaturesToJSON = async () => {
    const { documentViewer } = instance.Core
    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    const exportSignatures = await signatureTool.exportSignatures();
    console.log('exportSignatures', exportSignatures[0]);
    const data = JSON.stringify(exportSignatures[0])
    console.log('data', data);
  }

  const exportSignaturesToImage = async () => {
    const { annotationManager, documentViewer } = instance.Core;
    const annotationsList = annotationManager.getAnnotationsList();

    annotationsList.forEach(annotation => {
      if (annotation.Subject === "Signature") {
        extractAnnotationSignature(annotation, documentViewer);
      }  
    })
  };

  const extractAnnotationSignature = async (annotation, docViewer) => {
    // Create a new Canvas to draw the Annotation on
    const canvas = document.createElement('canvas');
    // Reference the annotation from the Document
    const pageMatrix = docViewer.getDocument().getPageMatrix(annotation.PageNumber);
    // Set the height & width of the canvas to match the annotation
    canvas.height = annotation.Height;
    canvas.width = annotation.Width;
    const ctx = canvas.getContext('2d');
    // Translate the Annotation to the top Top Left Corner of the Canvas ie (0, 0)
    ctx.translate(-annotation.X, -annotation.Y);
    // Draw the Annotation onto the Canvas
    annotation.draw(ctx, pageMatrix);
    // Convert the Canvas to a Blob Object for Upload
    canvas.toBlob((blob) => {
        // Call your Blob Storage Upload Function
      fileSaver.saveAs(blob, 'my-signature.png');
    });
  }

  const getSavedSignatures = async () => {
    const { documentViewer } = instance.Core
    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    const savedSignatures = signatureTool.getSavedSignatures()
    console.log('savedSignatures', savedSignatures)
    // debugger;
    // await signatureTool.setSignature(savedSignatures[0])
    // await signatureTool.addSignature()
    // debugger;
  }

  const addImageSignature = () => {
    const { Annotations, annotationManager } = instance.Core
    const stampAnnot = new Annotations.StampAnnotation();
      stampAnnot.PageNumber = 1;
      stampAnnot.X = 0;
      stampAnnot.Y = 0;
      stampAnnot.Width = 150;
      stampAnnot.Height = 150;
      const keepAsSVG = false;
      stampAnnot.setImageData(signatureImage, keepAsSVG);
      stampAnnot.Subject = 'Signature'

      annotationManager.addAnnotation(stampAnnot);
      annotationManager.redrawAnnotation(stampAnnot);
  }

  const addFreeHandSignature = async () => {
    const { Annotations, annotationManager, documentViewer } = instance.Core
    const Math = instance.Core.Math;
    const freeHandAnnot = new Annotations.FreeHandAnnotation();
    freeHandAnnot.PageNumber = 1;
    freeHandAnnot.X = 0;
    freeHandAnnot.Y = 0;
    freeHandAnnot.Width = 100;
    freeHandAnnot.Height = 100;

    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    const exportSignatures = await signatureTool.exportSignatures();
    console.log('exportSignatures', exportSignatures[0]);

    // exportSignatures[0].forEach((path, index) => {
    //   freeHandAnnot.setPath(path, index);  
    // })
    const originPathArray = JSON.parse(signatureJson2);
    // originPathArray.forEach((path, index) => {
    //   freeHandAnnot.setPath(path, index);  
    // })
    freeHandAnnot.setPath(originPathArray[0], 0);
    freeHandAnnot.setPath(originPathArray[1], 1);
    // freeHandAnnot.setPath(originPath[2], 2);
    // freeHandAnnot.setPath(originPath[3], 3);
    // freeHandAnnot.setPath(originPath);
    freeHandAnnot.Subject = 'Signature'
    annotationManager.addAnnotation(freeHandAnnot);
    annotationManager.redrawAnnotation(freeHandAnnot);

  }

  const placeSignature = () => {
    const { documentViewer } = instance.Core
    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    signatureTool.addEventListener('locationSelected', locationSelectedHandler);
  }

  const locationSelectedHandler = async () => {
    const { documentViewer } = instance.Core
    const signatureTool = documentViewer.getTool('AnnotationCreateSignature');
    const savedSignatures = signatureTool.getSavedSignatures()
    await instance.UI.disableElements(['toolStylePopup'])
    await signatureTool.setSignature(savedSignatures[0]);
    await signatureTool.addSignature();
    // await instance.UI.closeElements(['toolStylePopup'])
    // await instance.UI.closeElements(['signatureModal']);
    await instance.UI.enableElements(['signatureModal', 'toolStylePopup'])
  }

  return (
    <div className="App">
      <button onClick={exportSignaturesToJSON}>Export Signatures to JSON</button>
      <button onClick={exportSignaturesToImage}>Export Signatures to Image</button>
      <button onClick={getSavedSignatures}>getSavedSignatures</button>
      <button onClick={loadSignatureImage}>Load image signature</button>
      <button onClick={addImageSignature}>addImageSignature</button>
      <button onClick={addFreeHandSignature}>addFreeHandSignature</button>
      <button onClick={placeSignature}>place Signature</button>
      {/* <button onClick={fix}>fix</button> */}
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
}

export default SaveAndImportSignature;