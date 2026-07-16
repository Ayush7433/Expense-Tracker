const ImageKit = require("imagekit");

let imagekit;

try {
  if (
    process.env.IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.IMAGEKIT_URL_ENDPOINT
  ) {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  } else {
    console.warn(
      "⚠️ ImageKit credentials are missing in .env. Image uploads will fail."
    );
  }
} catch (error) {
  console.error("Failed to initialize ImageKit:", error);
}

/**
 * Uploads a file buffer to ImageKit
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The desired file name
 * @param {string} folder - The destination folder in ImageKit
 * @returns {Promise<Object>} - The ImageKit upload response
 */
const uploadToImageKit = async (
  fileBuffer,
  fileName,
  folder = "/expense-tracker/avatars"
) => {
  if (!imagekit) {
    throw new Error(
      "ImageKit is not configured on the server. Please check your .env file."
    );
  }

  return await imagekit.upload({
    file: fileBuffer.toString("base64"),
    fileName,
    folder,
  });
};

module.exports = {
  uploadToImageKit,
};
