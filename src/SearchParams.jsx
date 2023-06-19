import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchQuery } from "./petApiService";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { all } from "./searchParamsSlice";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector((state) => state.searchParams.value);
  const dispatch = useDispatch();

  let { data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">Location</label>
        <input name="location" id="location" placeholder="Location" />

        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal}>{animal}</option>
          ))}
        </select>

        <label htmlFor="breed">Breed</label>
        <select id="breed" disabled={breeds.length === 0} name="breed">
          <option />
          {breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>

        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
