import express from "express";
const router = express.Router();

// In-memory contacts
let contacts = [];

// Mock current user (in a real app, use login & JWT)
let currentUser = { id: "user123", name: "John Doe", email: "john@example.com" };

// -----------------------------
// Add new contact
// POST /api/contacts
// -----------------------------
router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  const id = Date.now().toString(16);
  const newContact = { id, name, email, phone, userId: currentUser.id };
  contacts.push(newContact);
  res.json({ message: "Contact added!", contact: newContact });
});

// -----------------------------
// Get all contacts for current user
// GET /api/contacts
// -----------------------------
router.get("/", (req, res) => {
  const userContacts = contacts.filter(c => c.userId === currentUser.id);
  res.json({ contacts: userContacts });
});

// -----------------------------
// Update contact
// PUT /api/contacts/:id
// -----------------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = contacts.find(c => c.id === id && c.userId === currentUser.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });

  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  res.json({ message: "Contact updated!", contact });
});

// -----------------------------
// Delete contact
// DELETE /api/contacts/:id
// -----------------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex(c => c.id === id && c.userId === currentUser.id);
  if (index === -1) return res.status(404).json({ message: "Contact not found" });

  const deleted = contacts.splice(index, 1);
  res.json({ message: "Contact deleted!", contact: deleted[0] });
});

// -----------------------------
// Search contact by name, email, or phone
// GET /api/contacts/search/:text
// -----------------------------
router.get("/search/:text", (req, res) => {
  const text = req.params.text.toLowerCase();
  const results = contacts.filter(c =>
    c.userId === currentUser.id &&
    (c.name.toLowerCase().includes(text) ||
     c.email.toLowerCase().includes(text) ||
     c.phone.includes(text))
  );
  res.json({ contacts: results });
});

// -----------------------------
// Get current user
// GET /api/current
// -----------------------------
router.get("/current", (req, res) => {
  res.json({ user: currentUser });
});

export default router;