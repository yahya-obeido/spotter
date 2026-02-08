type ApiResponse = {
  html?: string
  imageUrl?: string
}

type OutputSectionProps = {
  response?: ApiResponse | null
}

function OutputSection({ response = null }: OutputSectionProps) {
  return (
    <section className="output-grid">
      <div className="output-placeholder html-preview">
        <h2>HTML Preview</h2>
        {response?.html ? (
          <div dangerouslySetInnerHTML={{ __html: response.html }} />
        ) : (
          <p>This area will render the processed HTML once the backend responds.</p>
        )}
      </div>
      <div className="output-placeholder image-preview">
        <h2>Image Result</h2>
        {response?.imageUrl ? (
          <img src={response.imageUrl} alt="Generated route" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <p>Your generated image will appear here after it&apos;s fetched from the backend.</p>
        )}
      </div>
    </section>
  )
}

export default OutputSection

