import { useState, useEffect } from 'react';
import apiClient from '../api/client';

export const useFirstUpload = () => {
    const [firstImage, setFirstImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await apiClient.get('/uploads/');
                if (response.data && response.data.length > 0) {
                    setFirstImage(response.data[0].file_url);
                }
            } catch (err) {
                console.error("Failed to fetch uploads", err);
            }
        };

        fetchUploads();
    }, []);

    return firstImage;
};
