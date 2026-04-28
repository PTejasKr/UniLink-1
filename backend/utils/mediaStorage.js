import cloudinary from '../config/cloudinary.js';

const hasCloudinaryConfig = () => (
    Boolean(process.env.CLOUDINARY_CLOUD_NAME)
    && Boolean(process.env.CLOUDINARY_API_KEY)
    && Boolean(process.env.CLOUDINARY_API_SECRET)
);

const normalizeLocalPath = (filePath) => {
    const normalized = filePath.replace(/\\/g, '/');
    const uploadsIndex = normalized.indexOf('uploads/');
    if (uploadsIndex === -1) {
        return normalized;
    }

    return `/${normalized.slice(uploadsIndex)}`;
};

const storeUploadedFile = async (filePath, options = {}) => {
    if (hasCloudinaryConfig()) {
        const result = await cloudinary.uploader.upload(filePath, options);
        return {
            url: result.secure_url,
            provider: 'cloudinary',
        };
    }

    return {
        url: normalizeLocalPath(filePath),
        provider: 'local',
    };
};

export { hasCloudinaryConfig, storeUploadedFile };
