// Entry point for the Web/API layer
const express = require('express');
const app = express();

// Placeholder for route/controller registration
// ...existing code...

app.get('/', (req, res) => {
  res.send('Tech Debt Posture & Lifecycle Manager API');
});

// ...existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
