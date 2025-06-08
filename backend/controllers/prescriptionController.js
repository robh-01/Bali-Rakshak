import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import predictCropDisease from "../utils/predictCropDisease.js";

export const prescriptionGet = [
  upload.single("crop-image"),
  async (req, res) => {
    // console.log("getting request on the prediction route");
    const imageBuffer = req.file?.buffer;
    const mimeType = req.file?.mimeType;

    const prescription = await prescriptCropDisease(imageBuffer);
    res.send(prescription);
  },
];
