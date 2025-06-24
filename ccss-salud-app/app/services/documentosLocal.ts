import documentos from '../data/documentos.json';

export function getAllDocumentosLocal() {
  return Promise.resolve(documentos);
}

export function getDocumentoByIdLocal(id: number) {
  const doc = documentos.find((d: any) => d.id_pdf === id);
  return Promise.resolve(doc);
}