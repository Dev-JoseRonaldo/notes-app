import { NewNoteCard } from "@/components/NewNoteCard";
import { NoteCard } from "@/components/NoteCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard />
      </div>
    </div>
  );
}
