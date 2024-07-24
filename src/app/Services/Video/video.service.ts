import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Video } from 'src/app/Interfaces/Video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  url: string = '../../../assets/Json/videos.json';
  videos: Video[] = []

  constructor(
    private http: HttpClient
  ) { }

  getVideos(){
    return this.http.get(this.url)
  }

  getPaginatedVideos(pageIndex: number, pageSize: number){
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Obtener todos los datos del archivo JSON
    return this.http.get<any>(this.url).pipe(
      map(response => {
        // Aplicar paginación a los datos
        console.log(response)
        const paginatedData = response.slice(startIndex, endIndex);
        const totalItems = response.length;
        return { data: paginatedData, totalItems };
      })
    );
  }
}
