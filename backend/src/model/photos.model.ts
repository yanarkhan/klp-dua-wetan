export class PhotosResponse{
    id_foto:     number; 
    id_laporan?: string | null; 
    id_status?:  number | null;
    id_berita?:  number | null;
    url:         string;
    nama:        string;
}

export class CreatePhotosRequest {
    id_laporan?: string | null; 
    id_status?:  number | null;
    id_berita?:  number | null;
    url:         string;
    nama:        string;
}

export class UpdatePhotosRequest {
    id_foto:     number; 
    id_laporan?: string | null; 
    id_status?:  number | null;
    id_berita?:  number | null;
    url:         string;
    nama:        string;
}

export class SearchPhotosRequest {
    id_laporan?: string | null; 
    id_status?:  number | null;
    id_berita?:  number | null;
    url:         string;
    nama:        string;
    page:        number; 
    size:        number; 
}
