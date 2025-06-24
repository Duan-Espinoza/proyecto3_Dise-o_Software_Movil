import blogs from '../data/blogs.json';

export function getAllBlogsLocal() {
  return Promise.resolve(blogs);
}

export function getBlogByIdLocal(id: number) {
  const blog = blogs.find((b: any) => b.id_blog === id);
  return Promise.resolve(blog);
}