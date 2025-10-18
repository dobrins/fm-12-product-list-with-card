import Cart from "./components/Cart";
import Dessert from "./components/Dessert";
import data from "./data/data.json";
import type { TDessert } from "./types/types";

function App() {
  return (
    <main>
      <section className="desserts">
        <h1 className="desserts__title">Desserts</h1>
        <ul className="desserts__grid">
          {(data as TDessert[]).map((dessert) => (
            <Dessert
              dessert={dessert}
              key={dessert.category}
            />
          ))}
        </ul>
      </section>
      <Cart />
    </main>
  );
}

export default App;
