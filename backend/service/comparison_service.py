from PIL import Image
import numpy as np
import io

class ComparisonService:
    def compare_images(self, image_bytes_a: bytes, image_bytes_b: bytes) -> float:
        """
        Compare two images using PIllow/Numpy and return a similarity score (0-100).
        Uses simple pixel-wise difference on thresholded images.
        """
        try:
            # Load images
            img_a = Image.open(io.BytesIO(image_bytes_a)).convert('L')
            img_b = Image.open(io.BytesIO(image_bytes_b)).convert('L')
            
            # Resize - keep it small for speed and low memory
            target_size = (200, 200)
            img_a = img_a.resize(target_size)
            img_b = img_b.resize(target_size)
            
            # Convert to numpy arrays
            arr_a = np.array(img_a)
            arr_b = np.array(img_b)
            
            # Simple thresholding (binarization) to handle "tracing" vs "solid" issues
            # Anything darker than 128 becomes black (0), else white (255)
            # This helps ignoring slight paper color differences
            arr_a = np.where(arr_a < 128, 0, 255)
            arr_b = np.where(arr_b < 128, 0, 255)
            
            # Calculate absolute difference
            diff = np.abs(arr_a - arr_b)
            
            # Calculate mean difference (0 to 255)
            mean_diff = np.mean(diff)
            
            # Normalize to 0-100 score
            # A mean_diff of 0 means identical -> 100% match
            # A mean_diff of 255 means opposite -> 0% match
            score = 100.0 * (1.0 - (mean_diff / 255.0))
            
            return max(0.0, min(100.0, score))
            
        except Exception as e:
            # Fallback or re-raise with clear message
            print(f"Comparison error: {e}")
            raise ValueError("Failed to process images for comparison")
