import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim

class ComparisonService:
    def compare_images(self, image_bytes_a: bytes, image_bytes_b: bytes) -> float:
        """
        Compare two images and return a similarity score between 0 and 100.
        """
        # Decode images
        nparr_a = np.frombuffer(image_bytes_a, np.uint8)
        img_a = cv2.imdecode(nparr_a, cv2.IMREAD_GRAYSCALE)
        
        nparr_b = np.frombuffer(image_bytes_b, np.uint8)
        img_b = cv2.imdecode(nparr_b, cv2.IMREAD_GRAYSCALE)
        
        if img_a is None or img_b is None:
            raise ValueError("Could not decode one or both images")

        # Resize to fixed size for consistent comparison (e.g., 300x300)
        target_size = (300, 300)
        img_a = cv2.resize(img_a, target_size)
        img_b = cv2.resize(img_b, target_size)

        # Apply simple thresholding to emphasize structure (optional but often good for sketches)
        _, img_a = cv2.threshold(img_a, 127, 255, cv2.THRESH_BINARY)
        _, img_b = cv2.threshold(img_b, 127, 255, cv2.THRESH_BINARY)

        # Calculate SSIM
        score, _ = ssim(img_a, img_b, full=True)
        
        # Convert to percentage
        return max(0.0, min(100.0, score * 100))
