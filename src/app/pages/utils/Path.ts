import { environment } from "../../../environment/environment";

export class Path {
    static BASE_URL = environment.API_BASE;

    static UPLOAD_IMAGE = this.BASE_URL + 'upload';
}