
function DebugApp() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh' 
    }}>
      <h1>Debug React App</h1>
      <p>If you can see this, React is working!</p>
      <div style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
        margin: '20px 0'
      }}>
        Test Div
      </div>
    </div>
  );
}

export default DebugApp;
