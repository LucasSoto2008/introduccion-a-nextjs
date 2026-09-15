import Link from 'next/link'

interface Libro {
  id: number
  titulo: string
  autor: string
  anyo_publicacion: number
  disponible: boolean
}

export async function libros(): Promise<Libro[]> {
  const res = await fetch('http://127.0.0.1:8000/api/libros')
  if (!res.ok) {
    throw new Error('Error al cargar libros')
  }
  return res.json()
}

export default async function PáginaLibros() {
  try {
    const libros = await libros()

    return (
      <h1>Libros</h1>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            <Link href={`/libros/${libro.id}`}>
              <a>{libro.titulo}</a>
            </Link> - {libro.autor}
          </li>
        ))}
      </ul>
    )
  } catch (error) {
    return (
      <h1>Error</h1>
      <p>No se pudieron cargar los libros. Intentá nuevamente más tarde.</p>
    )
  }
}