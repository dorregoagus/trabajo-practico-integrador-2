import useFetch from '../hooks/useFetch'

function HomePage() {
    const { data, isLoading, error } = useFetch(
        'http://localhost:3000/api/articles'
    )

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg text-gray-600">Cargando artículos...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg text-red-600">
                    Error al cargar los artículos: {error}
                </p>
            </main>
        )
    }

    if (!data || data.length === 0) {
        return (
            <main className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg text-gray-600">
                    No hay artículos para mostrar.
                </p>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <section className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">
                    Artículos
                </h1>

                <div className="grid gap-6 md:grid-cols-2">
                    {data.map((article) => (
                        <article
                            key={article.id}
                            className="rounded-xl bg-white p-6 shadow-md"
                        >
                            <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                {article.title}
                            </h2>

                            <p className="mb-4 text-gray-600">
                                {article.excerpt}
                            </p>

                            <p className="text-sm text-gray-500">
                                Autor: {article.author?.alias}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HomePage