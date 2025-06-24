import noticias from '../data/noticias.json';

export function getAllNoticiasLocal() {
  return Promise.resolve(noticias);
}

export function getNoticiaByIdLocal(id: number) {
  const noticia = noticias.find((n: any) => n.id_noticia === id);
  return Promise.resolve(noticia);
}