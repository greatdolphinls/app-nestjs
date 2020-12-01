export const setUploadFileKey = (request: any, file: any, cb: (err: any, result: string) => void) => {
  cb(null, `${request.params.entityName}/${Date.now().toString()}-${file.originalname}`);
};
