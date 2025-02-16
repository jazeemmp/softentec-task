import PaginatedData from "./components/PaginatedData";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <TodoList />
      <PaginatedData/>
    </div>
  );
};

export default App;
