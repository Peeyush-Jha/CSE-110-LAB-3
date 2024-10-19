import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constant";
import { ToDoList } from "./toDoList";
test("renders create note form", () => {
 render(<StickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
});

test('should display all the notes that are created', () => {
    render(<StickyNotes />);
    
    dummyNotesList.forEach(note => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });
  });


