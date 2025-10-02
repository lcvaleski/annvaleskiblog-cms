export default function Header() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px 30px 20px'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'normal',
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif'
      }}>
        <span style={{ color: '#8B2635' }}>annvaleski</span>
        <span style={{ color: '#000' }}>blog-cms</span>
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