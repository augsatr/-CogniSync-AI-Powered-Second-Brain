import os
from typing import Optional

try:
    import cv2
    CV2_AVAILABLE = True
except ImportError:
    CV2_AVAILABLE = False

try:
    import pytesseract
    TESSERACT_AVAILABLE = True
except ImportError:
    TESSERACT_AVAILABLE = False


class VisionService:
    def extract_text(self, image_path: str) -> Optional[str]:
        if not os.path.exists(image_path):
            return None

        if not CV2_AVAILABLE or not TESSERACT_AVAILABLE:
            return f"[OCR placeholder] Text extraction would process: {os.path.basename(image_path)}"

        try:
            img = cv2.imread(image_path)
            if img is None:
                return "[Error] Could not read image file"
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
            text = pytesseract.image_to_string(thresh)
            return text.strip() if text.strip() else "[No text detected]"
        except Exception as e:
            return f"[OCR Error] {str(e)}"

    def classify_document(self, filename: str) -> str:
        name_lower = filename.lower()
        if any(kw in name_lower for kw in ["report", "analysis", "summary"]):
            return "report"
        if any(kw in name_lower for kw in ["invoice", "receipt", "bill"]):
            return "financial"
        if any(kw in name_lower for kw in ["contract", "agreement", "nda"]):
            return "legal"
        if any(kw in name_lower for kw in ["meeting", "notes", "minutes"]):
            return "meeting"
        if any(kw in name_lower for kw in ["resume", "cv", "profile"]):
            return "hr"
        return "general"

    def detect_faces(self, image_path: str) -> int:
        if not CV2_AVAILABLE or not os.path.exists(image_path):
            return 0
        try:
            img = cv2.imread(image_path)
            face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
            )
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)
            return len(faces)
        except Exception:
            return 0
