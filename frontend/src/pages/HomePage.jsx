import useFetch from '../hooks/useFetch'

function HomePage() {
    const { data, isLoading, error } = useFetch(
        'http://localhost:3000/api/articles'
    )

    if (isLoading) {
        return <p>Cargando artículos...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (!data || data.length === 0) {
        return <p>No hay artículos para mostrar.</p>
    }

    return (
        <main>
            <h1>Artículos</h1>

            <section>
                {data.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.excerpt}</p>
                        <p>Autor: {article.author?.alias}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default HomePage