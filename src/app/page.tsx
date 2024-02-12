"use client"

import { NewNoteCard } from "@/components/NewNoteCard";
import { NoteCard } from "@/components/NoteCard";
import { ChangeEvent, useState } from "react";

interface Note {
  id: string
  date: Date
  content: string
}

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const [notes, setNotes] = useState<Note[]>(() => { 
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const noteArray = [newNote, ...notes]
    setNotes(noteArray)

    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  function onNoteDeleted(id: string) {
    const noteArray = notes.filter(note => note.id !== id)
    setNotes(noteArray)
    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes
  
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-state-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated = {onNoteCreated}/>

        {filteredNotes.map(note =>{
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        })}
      </div>
    </div>
  );
}
