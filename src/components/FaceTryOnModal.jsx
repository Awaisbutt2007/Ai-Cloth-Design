import React, { useEffect, useRef, useState } from 'react';
import { Camera, ImagePlus, ScanFace, Sparkles, X } from 'lucide-react';
import { repairImageUrl, DEFAULT_POST_PLACEHOLDER } from '../constants';

export default function FaceTryOnModal({ product, onClose }) {
  const [facePhoto, setFacePhoto] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [previewMessage, setPreviewMessage] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const title = typeof product === 'string' ? 'Custom Design' : (product?.title || 'Custom Design');
  const productImage = repairImageUrl(
    typeof product === 'string' ? product : product?.url || product?.image_url || product?.images?.[0],
  );

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [onClose]);

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraOpen]);

  const openCamera = async () => {
    setCameraError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not supported in this browser. Upload a face photo instead.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (error) {
      const denied = error?.name === 'NotAllowedError' || error?.name === 'SecurityError';
      setCameraError(denied
        ? 'Camera permission was blocked. Allow it in browser settings, or upload a face photo.'
        : error?.name === 'NotFoundError'
          ? 'No camera was found on this device. Upload a face photo instead.'
          : `Camera could not be opened: ${error?.message || 'unknown error'}`);
    }
  };

  const captureFace = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setFacePhoto(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  };

  const chooseFacePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setCameraError('Choose an image file for the face scan.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setFacePhoto(reader.result);
      setPreviewMessage('');
    };
    reader.onerror = () => setCameraError('The selected image could not be read. Try another photo.');
    reader.readAsDataURL(file);
    stopCamera();
    setCameraError('');
  };

  return (
    <div className="try-on-overlay" onClick={onClose}>
      <section className="try-on-modal" role="dialog" aria-modal="true" aria-labelledby="try-on-title" onClick={(event) => event.stopPropagation()}>
        <header className="try-on-header">
          <div>
            <span className="try-on-eyebrow"><Sparkles size={14} /> Virtual fitting room</span>
            <h2 id="try-on-title">AI Try-On</h2>
            <p>Add a face photo to start your try-on preview.</p>
          </div>
          <button type="button" className="try-on-close" onClick={onClose} aria-label="Close try-on">
            <X size={20} />
          </button>
        </header>

        <div className="try-on-body">
          <section className="try-on-face-panel" aria-labelledby="try-on-face-title">
            <div className="try-on-panel-heading">
              <span className="try-on-step">01</span>
              <div><h3 id="try-on-face-title">Face scan</h3><p>Face the camera or choose a clear front-facing photo.</p></div>
            </div>
            <div className={`try-on-face-stage ${facePhoto ? 'has-photo' : ''}`}>
              {facePhoto ? (
                <img src={facePhoto} alt="Selected face for virtual try-on" />
              ) : isCameraOpen ? (
                <video ref={videoRef} playsInline muted autoPlay aria-label="Live face camera preview" />
              ) : (
                <div className="try-on-face-empty"><ScanFace size={48} strokeWidth={1.4} /><span>Your face preview appears here</span></div>
              )}
              {(isCameraOpen || facePhoto) && <div className="try-on-face-frame" aria-hidden="true" />}
            </div>
            <div className="try-on-face-actions">
              {isCameraOpen ? (
                <button type="button" className="try-on-primary" onClick={captureFace}><Camera size={17} /> Capture face</button>
              ) : (
                <button type="button" className="try-on-primary" onClick={openCamera}><Camera size={17} /> Use camera</button>
              )}
              <button type="button" className="try-on-secondary" onClick={() => fileInputRef.current?.click()}><ImagePlus size={17} /> Upload photo</button>
              {facePhoto && <button type="button" className="try-on-retake" onClick={() => setFacePhoto('')}>Retake</button>}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={chooseFacePhoto} hidden />
            </div>
            {cameraError && <p className="try-on-error" role="alert">{cameraError}</p>}
            {facePhoto && <p className="try-on-ready"><ScanFace size={15} /> Face photo ready for preview.</p>}
            {previewMessage && <p className="try-on-outfit-note" role="status">{previewMessage}</p>}
          </section>

          <section className="try-on-outfit-panel" aria-labelledby="try-on-outfit-title">
            <div className="try-on-panel-heading">
              <span className="try-on-step">02</span>
              <div><h3 id="try-on-outfit-title">Selected outfit</h3><p>{title}</p></div>
            </div>
            <div className="try-on-outfit-stage">
              {productImage ? <img src={productImage} alt={title} onError={(event) => { event.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} /> : <div className="try-on-face-empty"><Sparkles size={42} /><span>Outfit preview unavailable</span></div>}
            </div>
            <p className="try-on-outfit-note">Your face photo stays in this browser preview and is not uploaded.</p>
          </section>
        </div>

        <footer className="try-on-footer">
          <span>{facePhoto ? 'Face photo selected' : 'Add a face photo to continue'}</span>
          <button type="button" className="try-on-primary" disabled={!facePhoto} onClick={() => setPreviewMessage('Your face photo and outfit are ready. Realistic AI garment rendering is not connected yet.')}>
            <Sparkles size={17} /> Preview outfit
          </button>
        </footer>
      </section>
    </div>
  );
}
