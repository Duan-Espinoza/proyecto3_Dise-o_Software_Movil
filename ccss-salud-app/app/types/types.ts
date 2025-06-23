import { ReactNode } from "react";

export type Blog = {
  id_blog: number;
  titulo: string;
  // Add other fields as needed, for example:
  // contenido: string;
  // autor: string;
  // fecha: string;
};

export type News = {
  id_noticia: number;
  titulo: string;
  imagen: string;
  contenido: string;
};

export type Document = {
  titulo: ReactNode;
  imagen: string | undefined;
  contenido: ReactNode;
  id_pdf: number;
  nombre_pdf: string;
  // Add other fields as needed, for example:
  // descripcion: string;
  // fecha_publicacion: string;
};