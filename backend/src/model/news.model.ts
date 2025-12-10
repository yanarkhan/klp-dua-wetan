export class NewsResponse{
    id_berita:    number; 
    judul_berita: string; 
    deskripsi:    string;
    ringkas:      string;
    tanggal:      Date;
}

export class CreateNewsRequest {
    judul_berita: string; 
    deskripsi:    string;
    ringkas:      string;
    tanggal:      Date;
}

export class UpdateNewsRequest {
    id_berita:    number; 
    judul_berita: string; 
    deskripsi:    string;
    ringkas:      string;
    tanggal:      Date;
}

export class SearchNewsRequest {
    judul_berita: string; 
    deskripsi:    string;
    ringkas:      string;
    tanggal:      Date;
    page: number; 
    size: number; 
}