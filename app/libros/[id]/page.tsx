interface Libro {
  id: number
  titulo: string
  autor: string
  anyo_publicacion: number
  disponible: boolean
}

export default async function PáginaDetalle({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/libros/${id}`)
    if (!res.ok) {
      return (
        <div>
          <h1>Libro no encontrado</h1>
          <p>El libro con ID ${id} no existe.</p>
        </div>
      )
    }
    const libro: Libro = await res.json()

    return (
      <div>
        <h1>{libro.titulo}</h1>
        <p><strong>Autor:</strong> {libro.autor}</p>
        <p><strong>Año:</strong> {libro.anyo_publicacion}</p>
        <p><strong>Disponible:</strong> {libro.disponible ? 'Sí' : 'No'}</p>
      </div>
    )
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se pudo cargar el detalle del libro.</p>
      </div>
    )
  }
}