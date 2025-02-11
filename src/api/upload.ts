import instance from "../axios/customize";

export const uploadSingleFileAPI = async (file: File) => {
    const url = `/api/v1/upload-single-file`
    const formData = new FormData();
    formData.append("fileName", file);
    const res = await instance.post(url!, formData);
    return res.data as IBEResponse<IUploadSingleFile>
}