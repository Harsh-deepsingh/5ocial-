import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "../api/uploadthing/core";

// Set the correct URL to your Next.js API route for handling uploads
const uploadUrl = "https://blindlysocial.com/api/uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: uploadUrl,
});

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: uploadUrl,
});
