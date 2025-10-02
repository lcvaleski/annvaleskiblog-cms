
export default function Header() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px 30px 20px'
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        margin: 0
      }}>
        AnnValeskiBlog CMS
      </h1>
      <p style={{
        fontSize: '14px',
        color: '#666',
        marginTop: '8px'
      }}>
        Content Management System
      </p>
    </div>
  )
}