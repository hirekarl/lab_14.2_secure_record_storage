const router = require("express").Router()
const { Note } = require("../../models")
const { authMiddleware } = require("../../utils/auth")

router.use(authMiddleware)

router.get("/", async (req, res) => {
  try {
    const allUserNotes = await Note.find({ user: req.user._id })
    res.json(allUserNotes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      user: req.user._id,
    })
    res.status(201).json(newNote)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id)

    if (!foundNote) {
      return res.status(404).json({ message: "No note found with this id!" })
    }

    if (foundNote.user !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to view this note." })
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id)

    if (!foundNote) {
      return res.status(404).json({ message: "No note found with this id!" })
    }

    if (foundNote.user !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this note." })
    }

    const updatedNote = await Note.findByIdAndUpdate(foundNote._id, req.body, {
      new: true,
    })

    res.json(updatedNote)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id)

    if (!foundNote) {
      return res.status(404).json({ message: "No note found with this id!" })
    }

    if (foundNote.user !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this note." })
    }

    res.json({ message: "Note deleted!" })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
